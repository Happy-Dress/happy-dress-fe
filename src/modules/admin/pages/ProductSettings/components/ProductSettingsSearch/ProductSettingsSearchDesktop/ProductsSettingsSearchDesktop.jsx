import React from 'react';
import s from './ProductsSettingsSearchDesktop.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonSearchLayout from './components/SkeletonSearchLayout';
import withSkeleton from '../../../../../../../common/ui/hocs/withSkeleton';
import classNames from 'classnames';
import { setCategory, toggleFilter } from '../../../../../../../common/ui/store/slices/productsSearchSlice';
import SearchBar from './components/SearchBar/SearchBar';
import { ReactComponent as Filter } from '../../../../../../../common/assets/images/filter.svg';
import { ReactComponent as Cross } from '../../../../../../../common/assets/images/x.svg';
import DetailedSearch from '../components/DetailedSearch/DetailedSearch';


const ProductsSettingsSearchDesktop = () => {

    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedCategoryId = useSelector(state => state.productsSearch.filters.categoryId);
    const isFilterOpened = useSelector(state => state.productsSearch.ifFilterOpened);
    const isLoading = useSelector(state => state.catalogueSettings.loading);
    const dispatch = useDispatch();

    const isCategorySelected = (category) => {
        return category?.id === selectedCategoryId;
    };

    const selectCategory = (categoryId) => {
        dispatch(setCategory(categoryId));
    };


    const CategoriesLayout = () =>
        <div className={s.ProductsSettingsSearchDesktop_categoriesList}>
            {catalogueSettings.categories.map((category, index) =>
                <p
                    className={classNames(isCategorySelected(category) ?
                        s.ProductsSettingsSearchDesktop_categoriesList_category_selected :
                        s.ProductsSettingsSearchDesktop_categoriesList_category
                    )}
                    onClick={() => selectCategory(category.id)}
                    key={index}>{category.name}
                </p>)}
        </div>;

    const CategoriesLayoutWithSkeleton = withSkeleton({
        loading: isLoading, skeleton: <SkeletonSearchLayout/>
    })(CategoriesLayout);

    return (
        <div className={s.ProductsSettingsSearchDesktop}>
            <div className={s.ProductsSettingsSearchDesktop_breadCrumbs}>{'Главная > Управление товаром'}</div>
            <h2 className={s.ProductsSettingsSearchDesktop_heading}>{'Управление товаром'}</h2>
            <CategoriesLayoutWithSkeleton/>
            <div className={s.ProductsSettingsSearchDesktop_searchBarWrapper}>
                {isFilterOpened ?
                    <div className={s.detailedSearch}>
                        <div className={s.detailedSearch_searchBar}>
                            <SearchBar/>
                            <div className={s.detailedSearch_cross} onClick={() => dispatch(toggleFilter())}><Cross/>
                            </div>
                        </div>
                        <div className={s.detailedSearch_dropdownsWrapper}>
                            <DetailedSearch/>
                        </div>
                    </div>
                    :
                    <>
                        <SearchBar/>
                        {!isLoading && <div onClick={() => dispatch(toggleFilter())}><Filter/></div>}
                    </>
                }

            </div>
        </div>
    );
};

export default ProductsSettingsSearchDesktop;
