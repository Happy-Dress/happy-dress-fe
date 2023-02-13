import React, { useEffect, useMemo, useState } from 'react';
import s from './CatalogHeaderDesktop.module.scss';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { DropdownSelectList } from '../../../../../../../../common/ui/components/Dropdowns';
import { SearchBarInput } from '../../../../../../../../common/ui/components/SeacrhBarInput';
import classNames from 'classnames';
import FilterBadge from './components/FilterBadge';
import { CATALOG_HEADER_VARIABLES } from '../../CatalogHeader.dictionary';

const { BASIC_CATEGORY_ID } = CATALOG_HEADER_VARIABLES;

const CatalogHeaderDesktop = ({ filters }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [currentFilters, setCurrentFilters] = useState({});

    useEffect(() => {
        setCurrentFilters(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('categories', String(BASIC_CATEGORY_ID));
            return Object.fromEntries(params.entries());
        });
    }, []);

    useEffect(() => {
        const queryString = new URLSearchParams(currentFilters).toString();
        if(queryString) {
            setSearchParams(queryString + (searchParams.get('search') ? `&search=${searchParams.get('search')}` : ''));
        }
    }, [currentFilters]);

    const changeFilter = (id, currentCategory, type) => {
        setCurrentFilters(prevState => {
            const newState = { ...prevState };
            if(!newState[currentCategory]) {
                newState[currentCategory] = String(id);
                return newState;
            }
            if(type === 'add') {
                newState[currentCategory] += `,${id}`;
            }
            if(type === 'remove') {
                newState[currentCategory] = newState[currentCategory].split(',').filter(item => item !== id).join(',');
            }
            if(!newState[currentCategory].length) {
                delete newState[currentCategory];
            }
            return newState;
        });
    };

    const TITLE = useMemo(() => {
        try {
            return filters.categories.filter(item => String(item.id) === currentFilters.categories)[0].name;
        } catch (e) {
            return '';
        }
    }, [currentFilters]);

    if(!currentFilters) return;

    return (
        <div className={s.CatalogHeaderDesktop}>
            <h1>{TITLE}</h1>
            <div className={classNames(s.filtersContainer, s.pageMargin)}>
                <div className={s.filters}>
                    {
                        Object.keys(filters).map(key => {
                            if (key === 'categories') return;
                            return <DropdownSelectList
                                key={key}
                                className={s.dropdown}
                                options={filters[key]}
                                changeFilter={changeFilter}
                                selectedItems={currentFilters[key] ? currentFilters[key] : ''}
                                currentCategory={key}
                            />;
                        })
                    }
                </div>
                <SearchBarInput className={s.input}/>
            </div>
            <div
                className={classNames(s.currentFilters, s.pageMargin)}
                style={{ display: !Object.keys(currentFilters).filter(item => item !== 'categories').length ? 'none': 'flex' }}
            >
                {
                    Object.keys(currentFilters).map(key => {
                        if (key === 'categories') return;
                        return currentFilters[key].split(',').map(item => {
                            return (
                                <FilterBadge
                                    key={item}
                                    itemCategory={key}
                                    itemId={item}
                                    filters={filters}
                                    setCurrentFilters={setCurrentFilters}
                                />
                            );
                        });
                    })
                }
            </div>
        </div>
    );
};

CatalogHeaderDesktop.propTypes = {
    filters: PropTypes.object.isRequired
};

export default CatalogHeaderDesktop;
