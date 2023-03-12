import React from 'react';
import ProductsSettingsSearch from './components/ProductSettingsSearch';
import ProductsList from './components/ProductsList';
import { useCatalogFetch } from '../../../../common/ui/hooks/useCatalogFetch';

const ProductSettings = () =>{
    useCatalogFetch();

    return (
        <>
            <ProductsSettingsSearch/>
            <ProductsList/>
        </>
    );
};

export default ProductSettings;
