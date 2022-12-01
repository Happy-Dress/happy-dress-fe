import React  from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import { useDeviceTypeContext } from '../../../../../common/contexts/DeviceType';

const Categories=()=>{
    const { isDesktop }=useDeviceTypeContext();
    return(
        <>
            {isDesktop && <CategoriesDesktop />}
        </>
    );
};
export default Categories;