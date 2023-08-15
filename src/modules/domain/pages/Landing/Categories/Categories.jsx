import React, { useEffect, useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import CategoriesMobile from './CategoriesMobile/CategoriesMobile';
import retrieveCatalogSettings from '../../../../../common/api/catalogSettings/retrieveCatalogSettings';
import adaptive from '../../../../../common/ui/hocs/adaptive';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveCatalogSettings().then((settings) => {
            setCategories(settings.categories);
        });
    }, []);

    const AdaptiveCategories = adaptive(CategoriesDesktop, CategoriesMobile);

    return (
        <>
            { !!categories.length && <AdaptiveCategories categories={categories}/> }
        </>
    );
};
export default Categories;
