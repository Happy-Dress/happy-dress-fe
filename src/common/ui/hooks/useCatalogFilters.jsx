import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalogueItems, resetProducts } from '../store/slices/productsSearchSlice';
import { fetchCatalogueSettings } from '../store/slices/catalogueSettingsSlice';

export const useCatalogFilters = () => {
    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.productsSearch.filters);
    const currentPage = useSelector(state => state.productsSearch.currentPage);

    useEffect(() =>{
        if(catalogueSettings.category){
            dispatch(resetProducts());
            const pageToSearch = currentPage ? currentPage : 1;
            dispatch(fetchCatalogueItems({ filters: catalogueSettings, page: pageToSearch }));
        }
    }, [catalogueSettings]);

    useEffect(() =>{
        dispatch(fetchCatalogueSettings());
    }, []);
};
