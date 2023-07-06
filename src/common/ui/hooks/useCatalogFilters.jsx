import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalogueItems, resetProducts } from '../store/slices/productsSearchSlice';
import { fetchCatalogueSettings } from '../store/slices/catalogueSettingsSlice';

export const useCatalogFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.productsSearch.filters);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const products = useSelector(state => state.productsSearch.products);


    useEffect(() =>{
        if(filters.category && !products.length){
            dispatch(resetProducts());
            dispatch(fetchCatalogueItems({ filters: filters, page: 1 }));
        }
    }, [filters]);

    useEffect(() =>{
        if(!catalogueSettings.categories.length){
            dispatch(fetchCatalogueSettings());
        }
    }, []);
};
