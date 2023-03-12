import React from 'react';
import s from './DressCategories.module.scss';
import classNames from 'classnames';
import withSkeleton from '../../../../../../common/ui/hocs/withSkeleton';
import SkeletonSearchLayout from './components/SkeletonSearchLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../../../../../common/ui/store/slices/productsSearchSlice';

const DressCategories = () => {
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedCategoryId = useSelector(state => state.productsSearch.filters.category);
    const isLoading = useSelector(state => state.catalogueSettings.loading);
    const dispatch = useDispatch();

    const isCategorySelected = (category) => {
        return category?.id === selectedCategoryId;
    };

    const selectCategory = (categoryId) => {
        dispatch(setCategory(categoryId));
    };

    const CategoriesLayout = () =>
        <div className={s.categories}>
            {catalogueSettings.categories.map((category, index) =>
                <p
                    className={classNames(isCategorySelected(category) ?
                        s.selected :
                        s.category
                    )}
                    onClick={() => selectCategory(category.id)}
                    key={index}>{category.name}
                </p>)}
        </div>;

    const CategoriesLayoutWithSkeleton = withSkeleton({
        loading: isLoading, skeleton: <SkeletonSearchLayout/>
    })(CategoriesLayout);


    return (
        <div className={s.DressCategories}>
            <CategoriesLayoutWithSkeleton/>
        </div>
    );
};

export default DressCategories;
