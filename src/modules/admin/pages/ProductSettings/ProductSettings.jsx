import React from 'react';
import ProductsSettingsSearch from './components/ProductSettingsSearch';
import ProductsList from './components/ProductsList';
import { useCatalogFilters } from '../../../../common/ui/hooks/useCatalogFilters';

const ProductSettings = () =>{

    useCatalogFilters();

    return (
        <>
            <ProductsSettingsSearch/>
            <ProductsList/>
        </>
    );
};

export default ProductSettings;
