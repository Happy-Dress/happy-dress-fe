import React, { useEffect, useState } from 'react';
import s from './GoodsSettingHeaderDesktop.module.scss';
import FilterDropdown from './components/FilterDropdown';
import { useSearchParams } from 'react-router-dom';
import DressCategories from './components/DressCategories';
import CurrentFilterBadge from './components/CurrentFilterBadge';
import SearchBar from './components/SearchBar';
import PropTypes from 'prop-types';

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

    if(!currentFilters) return;

    return (
        <>
            <div className={s.Way}>Управление товаром</div>
            <h2>Управление товаром</h2>
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
                                return <FilterDropdown key={key} name={key} options={filters[key]} setCurrentFilters={setCurrentFilters} currentFilters={currentFilters}/>;
                            })
                        }
                    </div>
                </div>
                <div className={s.currentFilters} style={{ display: isOpen ? 'none': 'flex' }}>
                    {
                        Object.keys(currentFilters).map(key => {
                            if (key === 'categories') return;
                            return currentFilters[key].split(',').map(item => {
                                return (
                                    <CurrentFilterBadge
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