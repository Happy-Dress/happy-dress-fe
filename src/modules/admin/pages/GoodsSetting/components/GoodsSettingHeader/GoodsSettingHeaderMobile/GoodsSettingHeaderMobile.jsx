import React, { useEffect, useState } from 'react';
import s from './GoodsSettingHeaderMobile.module.scss';
import DressCategories from './components/DressCategories';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import CurrentFilterBadge from './components/CurrentFilterBadge';
import { useSearchParams } from 'react-router-dom';
import { retrieveCatalogueSettings } from '../../../../../../domain/api';
import { ButtonAccent } from '../../../../../../../common/ui/components';

const GoodsSettingHeaderMobile = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState();
    const [currentFilters, setCurrentFilters] = useState();


    useEffect(() => {
        retrieveCatalogueSettings()
            .then((settings) => {
                setFilters(settings);
                setCurrentFilters(() => {
                    const params = new URLSearchParams(searchParams.toString()).entries();
                    return Object.fromEntries(params);
                });
                setSearchParams(prev => {
                    if(!prev.has('categories')) {
                        prev.set('categories', settings.categories[0].id);
                        return prev.toString();
                    }
                    return prev.toString();
                });
            });
    }, []);

    useEffect(() => {
        setCurrentFilters(() => {
            const params = new URLSearchParams(searchParams.toString()).entries();
            return Object.fromEntries(params);
        });
    }, [searchParams.toString()]);

    const applyFilters = () => {
        const queryString = new URLSearchParams(currentFilters).toString();
        setSearchParams(queryString);
    };

    if (!filters) {
        return <p>Loader</p>;
    }

    return (
        <>
            <h2>Управление товаром</h2>
            <div className={s.searchContainer}>
                <DressCategories
                    category={(filters.categories && searchParams.get('categories')) ? filters.categories.filter(item => String(item.id) === String(searchParams.get('categories')))[0].name : ''}
                />
                <div className={s.searchBar + ' ' + (isOpen ? s.active : '')}>
                    <SearchBar setIsFiltersOpen={setIsOpen} isFiltersOpen={isOpen}/>
                    <div className={s.filters} style={{ display: isOpen ? 'flex' : 'none' }}>
                        {
                            Object.keys(filters).map(key => {
                                return <FilterDropdown key={key} name={key} options={filters[key]} setCurrentFilters={setCurrentFilters} currentFilters={currentFilters}/>;
                            })
                        }
                        <ButtonAccent text={'Применить'} onClick={applyFilters}/>
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

export default GoodsSettingHeaderMobile;