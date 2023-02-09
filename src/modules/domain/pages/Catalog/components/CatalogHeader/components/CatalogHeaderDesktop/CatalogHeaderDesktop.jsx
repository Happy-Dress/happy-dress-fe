import React, { useEffect, useState } from 'react';
import s from './CatalogHeaderDesktop.module.scss';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { DropdownSelectList } from '../../../../../../../../common/ui/components/Dropdowns';
import { SearchBarInput } from '../../../../../../../../common/ui/components/SeacrhBarInput';

const CatalogHeaderDesktop = ({ filters }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [currentFilters, setCurrentFilters] = useState();


    useEffect(() => {
        setCurrentFilters(() => {
            const params = new URLSearchParams(searchParams.toString()).entries();
            return Object.fromEntries(params);
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

    if(!currentFilters) return;
    return (
        <div className={s.CatalogHeaderDesktop}>
            <h1>{filters.categories.filter(item => String(item.id) === searchParams.get('categories'))[0].name}</h1>
            <div className={s.filtersContainer}>
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
        </div>
    );
};

CatalogHeaderDesktop.propTypes = {
    filters: PropTypes.object.isRequired
};

export default CatalogHeaderDesktop;