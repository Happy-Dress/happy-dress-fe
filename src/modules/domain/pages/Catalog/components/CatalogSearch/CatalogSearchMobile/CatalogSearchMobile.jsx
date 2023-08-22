import s from './CatalogSearchMobile.module.scss';
import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import {
    setCategory,
    toggleFilter,
} from '../../../../../../../common/ui/store/slices/productsSearchSlice';
import { ReactComponent as Filter } from '../../../../../../../common/assets/images/filter.svg';
import { ReactComponent as Cross } from '../../../../../../../common/assets/images/x.svg';
import { useDispatch, useSelector } from 'react-redux';
import DetailedSearch from '../components/DetailedSearch/DetailedSearch';
import FilterDropDown from '../components/FilterDropDown';
import { CATALOG_DICTIONARY } from '../../../Catalog.dictionary';
import CurrentFilters from '../components/CurrentFilters/CurrentFilters';

const {
    TITLE
} = CATALOG_DICTIONARY;

const CatalogSearchMobile = () =>{
    const isLoading = useSelector(state => state.catalogueSettings.loading);
    const dispatch = useDispatch();
    const isFilterOpened = useSelector(state => state.productsSearch.ifFilterOpened);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const renderOption = (option) =>{
        return <span className={s.CatalogSearchMobile_simpleOption}>{option.name}</span>;
    };

    return (
        <div className={s.CatalogSearchMobile}>
            <h2 className={s.CatalogSearchMobile_heading}>{TITLE}</h2>
            <div className={s.CatalogSearchMobile_searchBar}>
                <SearchBar/>
                {(!isLoading && !isFilterOpened) && <div onClick={() => dispatch(toggleFilter())}><Filter/></div> }
                {(!isLoading && isFilterOpened) && <div className={s.CatalogSearchMobile_cross} onClick={() => dispatch(toggleFilter())}><Cross/></div> }
            </div>

            <div className={s.CatalogSearchMobile_detailedSearchWrapper}>
                <FilterDropDown
                    selectedOptionIds={[selectedSettings.category]}
                    onSelect={(categoryId) => dispatch(setCategory({ category: categoryId, shouldDropProducts: true }))}
                    onUnSelect={() => {}}
                    name={catalogueSettings?.categories?.find(category => category.id === selectedSettings.category)?.name}
                    options={catalogueSettings.categories}
                    renderOption={renderOption}
                />
                {isFilterOpened && <DetailedSearch/> }
            </div>
            <CurrentFilters />
        </div>
    );
};

export default CatalogSearchMobile;
