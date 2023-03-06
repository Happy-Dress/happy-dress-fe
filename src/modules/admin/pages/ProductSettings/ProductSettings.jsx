import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogueSettings } from '../../../../common/ui/store/slices/catalogueSettingsSlice';
import ProductsSettingsSearch from './components/ProductSettingsSearch';
import ProductsList from './components/ProductsList';
import { fetchCatalogueItems, resetProducts } from '../../../../common/ui/store/slices/productsSearchSlice';

const ProductSettings = () =>{

    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.productsSearch.filters);

    useEffect(() =>{
        if(catalogueSettings.categoryId){
            dispatch(resetProducts());
            dispatch(fetchCatalogueItems(catalogueSettings));
        }
    }, [catalogueSettings]);

    useEffect(() =>{
        dispatch(fetchCatalogueSettings());
    }, []);

    return (
        <>
            <ProductsSettingsSearch/>
            <ProductsList/>
        </>
    );
};

export default ProductSettings;
