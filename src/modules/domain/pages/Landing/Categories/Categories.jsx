import React, { useEffect, useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import { useDeviceTypeContext } from '../../../../../common/contexts/DeviceType';
import CategoriesMobileCard from './CategoriesMobileCard/CategoriesMobileCard';
import getDataCards from '../../../api/getDataCards';


const Categories = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const [categoriesSsettings, retrievedCategoriesSsettings] = useState([]);
    useEffect(() => {
        (async () => {
            const newData = await getDataCards();
            retrievedCategoriesSsettings(newData);
        })();
    }, []);

    return (
        <>
            {(isDesktop && categoriesSsettings.length) && <CategoriesDesktop categories={categoriesSsettings}/>}
            {(isMobile && categoriesSsettings.length) && <CategoriesMobileCard categories={retrievedCategoriesSsettings}/>}
        </>
    );
};
export default Categories;