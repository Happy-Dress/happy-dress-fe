import React, { useEffect, useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import { useDeviceTypeContext } from '../../../../../common/contexts/DeviceType';
import CategoriesMobileCard from './CategoriesMobileCard/CategoriesMobileCard';
import retrieveCatalogueSettings from '../../../api/catalogueSettings/retrieveCatalogueSettings';

const Categories = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const [categoriesSettings, setCategoriesSettings] = useState([]);
    useEffect(() => {
        (async () => {
            const retrievedCategoriesSettings = await retrieveCatalogueSettings();
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
