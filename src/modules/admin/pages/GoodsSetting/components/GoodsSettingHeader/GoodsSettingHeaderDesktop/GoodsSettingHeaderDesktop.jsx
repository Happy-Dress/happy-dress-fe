import React, { useEffect, useState } from 'react';
import s from './GoodsSettingHeaderDesktop.module.scss';
import { useSearchParams } from 'react-router-dom';
import DressCategories from './components/DressCategories';
import FilterBadge from './components/FilterBadge';
import SearchBar from './components/SearchBar';
import PropTypes from 'prop-types';
import { GOODS_SETTING_DICTIONARY } from '../../../GoodsSetting.dictionary';
import { DropdownSelectList } from '../../../../../../../common/ui/components/Dropdowns';

const { GOODS_SETTING_TITLE } = GOODS_SETTING_DICTIONARY;

const GoodsSettingHeaderDesktop = ({ filters }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
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
            setSearchParams(queryString);
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
        <>
            <div className={s.Way}>Управление товаром</div>
            <h2 className={s.title}>{GOODS_SETTING_TITLE}</h2>
            <div className={s.searchContainer}>
                <DressCategories
                    categories={filters.categories}
                />
                <div className={s.searchBar + ' ' + (isOpen ? s.active : '')}>
                    <SearchBar setIsFiltersOpen={setIsOpen} isFiltersOpen={isOpen}/>
                    <div className={s.filters} style={{ display: isOpen ? 'flex' : 'none' }}>
                        {
                            Object.keys(filters).map(key => {
                                if (key === 'categories') return;
                                // return <FilterDropdown key={key} name={key} options={filters[key]} setCurrentFilters={setCurrentFilters} currentFilters={currentFilters}/>;
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
                </div>
                <div className={s.currentFilters} style={{ display: (isOpen || !Object.keys(currentFilters).filter(item => item !== 'categories').length) ? 'none': 'flex' }}>
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
        </>
    );
};

GoodsSettingHeaderDesktop.propTypes = {
    filters: PropTypes.object.isRequired
};

export default GoodsSettingHeaderDesktop;