import React, { useEffect, useState } from 'react';
import s from './GoodsSetting.module.scss';
import { GOODS_SETTINGS_DICTIONARY } from './GoodsSetting.dictionary';
import { ReactComponent as Search } from '../../../../common/assets/images/search.svg';
import { ReactComponent as Filter } from '../../../../common/assets/images/filter.svg';
import { ReactComponent as Cross } from '../../../../common/assets/images/x.svg';
import FilterDropdown from './components/FilterDropdown';
import { retrieveCatalogueSettings } from '../../../domain/api';
import { useSearchParams } from 'react-router-dom';
import DressCategories from './components/DressCategories';
import CurrentFilterBadge from './components/CurrentFilterBadge';

const {
    GOODS_SETTINGS_TITLE
} = GOODS_SETTINGS_DICTIONARY;

const GoodsSetting = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [searchBar, setSearchBar] = useState('');
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
            });
    }, []);

    useEffect(() => {
        const queryString = new URLSearchParams(currentFilters).toString();
        if(queryString) {
            setSearchParams(queryString);
        }
    }, [currentFilters]);


    if (!filters) {
        return <p>Loader</p>;
    }

    return (
        <div className={s.GoodsSettings}>
            <div className={s.Way}>Управление товаром</div>
            <h2>{GOODS_SETTINGS_TITLE}</h2>
            <div className={s.searchContainer}>
                <DressCategories
                    categories={filters.categories}
                />
                <div className={s.searchBar + ' ' + (isOpen ? s.active : '')}>
                    <div className={s.searchInput}>
                        <label>
                            <Search id={s.searchIcon}/>
                            <input
                                type="text"
                                placeholder={'Поиск..'}
                                value={searchBar}
                                onChange={(e) => setSearchBar(e.target.value)}
                            />
                        </label>
                        {isOpen ?
                            <Cross id={s.crossIcon} onClick={() => setIsOpen(false)}/>
                            :
                            <Filter id={s.filterIcon} onClick={() => setIsOpen(true)}/>
                        }
                    </div>
                    <div className={s.filters} style={{ display: isOpen ? 'flex' : 'none' }}>
                        {
                            Object.keys(filters).map(key => {
                                if (key === 'categories') return;
                                return <FilterDropdown key={key} name={key} options={filters[key]} setCurrentFilters={setCurrentFilters} currentFilters={currentFilters}/>;
                            })
                        }
                    </div>
                </div>
                <div className={s.currentFilters}>
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
        </div>
    );
};

export default GoodsSetting;
