import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalogueItems, resetProducts } from '../store/slices/productsSearchSlice';
import { fetchCatalogueSettings } from '../store/slices/catalogueSettingsSlice';

export const useCatalogFilters = () => {
    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.productsSearch.filters);
    const products = useSelector(state => state.productsSearch.products);


    useEffect(() =>{
        if(catalogueSettings.category && !products.length){
            dispatch(resetProducts());
            dispatch(fetchCatalogueItems({ filters: catalogueSettings, page: 1 }));
        }
    }, [catalogueSettings]);

    useEffect(() =>{
        dispatch(fetchCatalogueSettings());
    }, []);
};
