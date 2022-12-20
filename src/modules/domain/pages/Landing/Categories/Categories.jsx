import React, { useEffect, useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import { useDeviceTypeContext } from '../../../../../common/contexts/DeviceType';
import CategoriesMobileCard from './CategoriesMobileCard/CategoriesMobileCard';
import getSettings from '../../../api/getDataCards';

const Categories = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const [categoriesSettings, setCategoriesSettings] = useState([]);
    useEffect(() => {
        (async () => {
            const retrievedCategoriesSettings = await getSettings();
            setCategoriesSettings(retrievedCategoriesSettings.categories);
        })();
    }, []);
    return (
        <>
            {(isDesktop && categoriesSettings.length) && <CategoriesDesktop categories={categoriesSettings}/>}
            {(isMobile && categoriesSettings.length) && <CategoriesMobileCard categories={categoriesSettings}/>}
        </>
    );
};
export default Categories;