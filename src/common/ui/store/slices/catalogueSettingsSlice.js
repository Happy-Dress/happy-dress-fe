import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { retrieveCatalogueSettings } from '../../../api';

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
    'catalogueSettings/fetch',
    async () =>{
        return  await retrieveCatalogueSettings();
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
