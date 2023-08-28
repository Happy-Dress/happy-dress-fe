import React from 'react';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import CategoriesSkeletonDesktop from './CategoriesSkeletonDesktop';
import CategoriesSkeletonMobile from './CategoriesSkeletonMobile';

const CategoriesSkeleton = () => {
    const AdaptiveCategoriesSkeleton = adaptive(CategoriesSkeletonDesktop, CategoriesSkeletonMobile);
    return (<AdaptiveCategoriesSkeleton/>);
};

export default CategoriesSkeleton;