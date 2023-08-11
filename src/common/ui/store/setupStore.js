import { configureStore } from '@reduxjs/toolkit';
import productsSearchReducer from './slices/productsSearchSlice';
import catalogueSettingsReducer from './slices/catalogueSettingsSlice';
import productReducer from './slices/productSlice';


export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: {
            productsSearch: productsSearchReducer,
            catalogueSettings: catalogueSettingsReducer,
            product: productReducer,
        },
        preloadedState
    });
};
