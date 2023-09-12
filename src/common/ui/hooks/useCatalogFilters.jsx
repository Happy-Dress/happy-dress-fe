import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalogueItems, resetProducts, setLoading } from '../store/slices/productsSearchSlice';
import { fetchCatalogueSettings } from '../store/slices/catalogueSettingsSlice';

export const useCatalogFilters = (isSecure) => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.productsSearch.filters);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);

    useEffect(() => {
        if(filters.category) {
            dispatch(setLoading());
            dispatch(resetProducts());
            const timer = setTimeout(() => {
                dispatch(resetProducts());
                dispatch(fetchCatalogueItems({ filters, page: 1, isSecure }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [filters]);

    useEffect(() =>{
        if(!catalogueSettings.categories.length){
            dispatch(resetProducts());
            dispatch(fetchCatalogueSettings(isSecure));
        }
    }, []);
};
