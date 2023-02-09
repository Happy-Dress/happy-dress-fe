import React, { useEffect, useState } from 'react';
import s from './GoodsSettingHeaderMobile.module.scss';
import DressCategories from './components/DressCategories';
import SearchBar from './components/SearchBar';
import FilterBadge from './components/FilterBadge';
import { useSearchParams } from 'react-router-dom';
import { ButtonAccent } from '../../../../../../../common/ui/components';
import PropTypes from 'prop-types';
import { GOODS_SETTING_DICTIONARY } from '../../../GoodsSetting.dictionary';
import { DropdownSelectList } from '../../../../../../../common/ui/components/Dropdowns';

const { GOODS_SETTING_TITLE } = GOODS_SETTING_DICTIONARY;

const GoodsSettingHeaderMobile = ({ filters }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [currentFilters, setCurrentFilters] = useState();


    useEffect(() => {
        if(!filters.categories) return;

        setSearchParams(prev => {
            if(!prev.has('categories')) {
                prev.set('categories', filters.categories[0].id);
                return prev.toString();
            }
            return prev.toString();
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
        setIsOpen(false);
    };

    const deleteFilters = () => {
        setSearchParams(() => {
            const params = new URLSearchParams(searchParams.toString()).entries();
            const newState = Object.fromEntries(params);
            for(let key in newState) {
                if(key === 'categories' || key === 'search') continue;
                delete newState[key];
            }
            return new URLSearchParams(newState).toString();
        });
    };

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
            if(type === 'single') {
                newState[currentCategory] = String(id);
            }
            if(!newState[currentCategory].length) {
                delete newState[currentCategory];
            }
            return newState;
        });
    };

    if (!currentFilters) return;

    return (
        <>
            <h2 className={s.title}>{GOODS_SETTING_TITLE}</h2>
            <div className={s.searchContainer}>
                <DressCategories
                    category={(filters.categories && searchParams.get('categories')) ? filters.categories.filter(item => String(item.id) === String(searchParams.get('categories')))[0].name : ''}
                />
                <div className={s.searchBar + ' ' + (isOpen ? s.active : '')}>
                    <SearchBar setIsFiltersOpen={setIsOpen} isFiltersOpen={isOpen}/>
                    <div className={s.filters} style={{ display: isOpen ? 'flex' : 'none' }}>
                        {
                            Object.keys(filters).map(key => {
                                return <DropdownSelectList
                                    key={key}
                                    options={filters[key]}
                                    changeFilter={changeFilter}
                                    selectedItems={currentFilters[key] ?? ''}
                                    className={s.dropdown}
                                    currentCategory={key}
                                    isOptionsAbsolute={false}
                                    isSingleOptionOnly={key === 'categories'}
                                />;
                            })
                        }
                        <ButtonAccent text={'Применить'} onClick={applyFilters}/>
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
                                    />
                                );
                            });
                        })
                    }
                </div>
                <div className={s.deleteFilters}>
                    {(Object.keys(currentFilters).filter(key => key !== 'categories' && key !== 'search').length && !isOpen) ? <ButtonAccent text={'Сбросить фильтры'} onClick={deleteFilters}/> : ''}
                </div>
            </div>
        </>
    );
};

GoodsSettingHeaderMobile.propTypes = {
    filters: PropTypes.object.isRequired
};

export default GoodsSettingHeaderMobile;