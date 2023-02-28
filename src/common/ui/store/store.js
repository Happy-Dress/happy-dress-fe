import { configureStore } from '@reduxjs/toolkit';
import productsSearchReducer from './slices/productsSearchSlice';
import catalogueSettingsReducer from './slices/catalogueSettingsSlice';


export const store = configureStore({
    reducer: {
        productsSearch: productsSearchReducer,
        catalogueSettings: catalogueSettingsReducer
    },
});
