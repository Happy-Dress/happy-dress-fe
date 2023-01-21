import React, { useEffect, useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import CategoriesMobile from './CategoriesMobile/CategoriesMobile';
import retrieveCatalogueSettings from '../../../api/catalogueSettings/retrieveCatalogueSettings';
import adaptive from '../../../../../common/ui/hocs/adaptive';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveCatalogueSettings().then((settings) => {
            setCategories(settings.categories);
        });
    }, []);

    const AdaptiveCategories = adaptive(CategoriesDesktop, CategoriesMobile);

    return (
        <>
            { categories.length && <AdaptiveCategories categories={categories}/> }
        </>
    );
};
export default Categories;
