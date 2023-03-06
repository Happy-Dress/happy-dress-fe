import { configureStore } from '@reduxjs/toolkit';
import productsSearchReducer from './slices/productsSearchSlice';
import catalogueSettingsReducer from './slices/catalogueSettingsSlice';


export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: {
            productsSearch: productsSearchReducer,
            catalogueSettings: catalogueSettingsReducer
        },
        preloadedState
    });
};
