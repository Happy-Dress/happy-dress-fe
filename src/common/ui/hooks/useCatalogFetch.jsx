import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalogueItems, resetProducts } from '../store/slices/productsSearchSlice';
import { fetchCatalogueSettings } from '../store/slices/catalogueSettingsSlice';

export const useCatalogFetch = () => {
    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.productsSearch.filters);

    useEffect(() =>{
        if(catalogueSettings.category){
            dispatch(resetProducts());
            dispatch(fetchCatalogueItems(catalogueSettings));
        }
    }, [catalogueSettings]);

    useEffect(() =>{
        dispatch(fetchCatalogueSettings());
    }, []);
};
