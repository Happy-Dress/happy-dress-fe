import s from './ProductsSettingsSearchMobile.module.scss';
import React from 'react';
import SearchBar from '../ProductSettingsSearchDesktop/components/SearchBar/SearchBar';
import {
    setCategory,
    toggleFilter,
} from '../../../../../../../common/ui/store/slices/productsSearchSlice';
import { ReactComponent as Filter } from '../../../../../../../common/assets/images/filter.svg';
import { ReactComponent as Cross } from '../../../../../../../common/assets/images/x.svg';
import { useDispatch, useSelector } from 'react-redux';
import DetailedSearch from '../components/DetailedSearch/DetailedSearch';
import FilterDropDown from '../components/FilterDropDown';
import { PRODUCT_SETTINGS_DICTIONARY } from '../../../ProductSettings.dictionary';
import CurrentFilters from '../components/CurrentFilters/CurrentFilters';

const {
    TITLE
} = PRODUCT_SETTINGS_DICTIONARY;

const ProductsSettingsSearchMobile = () =>{
    const isLoading = useSelector(state => state.catalogueSettings.loading);
    const dispatch = useDispatch();
    const isFilterOpened = useSelector(state => state.productsSearch.ifFilterOpened);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const renderOption = (option) =>{
        return <span className={s.ProductsSettingsSearchMobile_simpleOption}>{option.name}</span>;
    };

    return (
        <div className={s.ProductsSettingsSearchMobile}>

            <h2 className={s.ProductsSettingsSearchMobile_heading}>{TITLE}</h2>
            <div className={s.ProductsSettingsSearchMobile_searchBar}>
                <SearchBar/>
                {(!isLoading && !isFilterOpened) && <div onClick={() => dispatch(toggleFilter())}><Filter/></div> }
                {(!isLoading && isFilterOpened) && <div className={s.ProductsSettingsSearchMobile_cross} onClick={() => dispatch(toggleFilter())}><Cross/></div> }
            </div>
            {!isFilterOpened &&
                <div className={s.ProductsSettingsSearchMobile_detailedSearchWrapper}>
                    <FilterDropDown
                        selectedOptionIds={[selectedSettings.category]}
                        onSelect={(categoryId) => dispatch(setCategory(categoryId))}
                        onUnSelect={() => {}}
                        name={'Категория'}
                        options={catalogueSettings.categories}
                        renderOption={renderOption}
                    />
                </div>
            }
            {isFilterOpened &&
                <div className={s.ProductsSettingsSearchMobile_detailedSearchWrapper}>
                    <FilterDropDown
                        selectedOptionIds={[selectedSettings.category]}
                        onSelect={(categoryId) => dispatch(setCategory(categoryId))}
                        onUnSelect={() => {}}
                        name={'Категория'}
                        options={catalogueSettings.categories}
                        renderOption={renderOption}
                    />
                    <DetailedSearch/>
                </div>
            }
            {
                !isFilterOpened && <CurrentFilters />
            }
        </div>
    );
};

export default ProductsSettingsSearchMobile;
