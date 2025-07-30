import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalogueItems, resetProducts, setLoading } from '../store/slices/productsSearchSlice';
import { fetchCatalogueSettings } from '../store/slices/catalogueSettingsSlice';
import { usePreviousRoute } from './usePreviousRoute';

export const useCatalogFilters = (isSecure) => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.productsSearch.filters);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const { previousRoute } = usePreviousRoute();

    useEffect(() => {
        const cardToFocus = getPreviouslyObservedProductCard();
        if (cardToFocus) {
            const offSets = getOffsets(cardToFocus);
            setTimeout(()=> {
                window.scrollTo({ left: offSets.left, top: offSets.top });
            });

        } else {
            resetAndLoadCatalogue();
        }

    }, [filters]);

    const getOffsets = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    };

    const resetAndLoadCatalogue = () => {
        if(filters.category) {
            dispatch(setLoading());
            dispatch(resetProducts());
            const timer = setTimeout(() => {
                dispatch(resetProducts());
                dispatch(fetchCatalogueItems({ filters, page: 1, isSecure }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    };

    useEffect(() =>{
        if(!catalogueSettings.categories.length){
            dispatch(resetProducts());
            dispatch(fetchCatalogueSettings(isSecure));
        }
    }, []);

    // Product route example '/domain/catalog/34'
    const isUserNavigatedFromProduct = () => {
        if (isSecure) {
            return false;
        }
        const routeParts = (previousRoute?.split('/')) || [];
        return routeParts.includes('catalog') && routeParts.length === 4;
    };
    
    const getPreviouslyObservedProductCard = () => {
        const previousProductId = isUserNavigatedFromProduct() && previousRoute?.split('/')[3];
        return previousProductId && document.getElementById(`product-${previousProductId}-card`);
    };
};
