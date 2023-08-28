import React, { useEffect, useState } from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import CategoriesMobile from './CategoriesMobile/CategoriesMobile';
import retrieveCatalogSettings from '../../../../../common/api/catalogSettings/retrieveCatalogSettings';
import adaptive from '../../../../../common/ui/hocs/adaptive';
import CategoriesSkeleton from './CategoriesSkeleton';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        retrieveCatalogSettings().then((settings) => {
            setCategories(settings.categories);
            setIsLoading(false);
        });
    }, []);

    const AdaptiveCategories = adaptive(CategoriesDesktop, CategoriesMobile);

    return (
        <>
            { isLoading && <CategoriesSkeleton/>}
            { !!categories.length && <AdaptiveCategories categories={categories}/> }
        </>
    );
};
export default Categories;
