import React  from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import { useDeviceTypeContext } from '../../../../../common/contexts/DeviceType';
import CategoriesMobileCard from './CategoriesMobileCard/CategoriesMobileCard';

const Categories=()=>{
    const { isDesktop,isMobile }=useDeviceTypeContext();
    return(
        <>
            {isDesktop && <CategoriesDesktop />}
            {isMobile && <CategoryMobileCard />}
        </>
    );
};
export default Categories;