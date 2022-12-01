import React, { useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import { useDeviceTypeContext } from '../../../../../common/contexts/DeviceType';

const Categories=()=>{
    const { isDesktop,isMobile }=useDeviceTypeContext();
    return(
        <>
            {isDesktop && <CategoriesDesktop />}
        </>
    );
};
export default Categories;