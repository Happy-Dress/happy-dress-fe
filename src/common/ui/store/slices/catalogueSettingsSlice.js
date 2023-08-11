import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { retrieveCatalogSettings } from '../../../api';

const initialState = {
    loading: false,
    settings: {
        categories: [],
        models: [],
        materials: [],
        colors: [],
        sizes: []
    }
};


const fetchCatalogueSettings = createAsyncThunk(
    'catalogSettings/fetch',
    async () =>{
        return await retrieveCatalogSettings();
    }
);

export const productsSearchSlice = createSlice({
    name: 'catalogueSettings',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogueSettings.fulfilled, (state, action) => {
            state.settings = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCatalogueSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCatalogueSettings.rejected, (state) => {
            state.loading = false;
        });
    },
});

export { fetchCatalogueSettings };

export default productsSearchSlice.reducer;
