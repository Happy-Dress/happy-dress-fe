import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCatalogueItems from '../../../api/catalogueItems/getCatalogueItems';
import { fetchCatalogueSettings } from './catalogueSettingsSlice';

const initialState = {
    loading: false,
    filters: {
        categoryId: null,
        modelIds: [],
        materialIds: [],
        colorIds: [],
        sizeIds: [],
        name: null
    },
    ifFilterOpened: false,
    products: [],
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchCatalogueItems = createAsyncThunk(
    'productsSearch/fetch',
    async (filters) =>{
        await sleep(3000);
        return await getCatalogueItems(filters);
    }
);


export const productsSearchSlice = createSlice({
    name: 'productsSearch',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.filters.categoryId = action.payload;
        },
        selectModel: (state, action) => {
            state.filters.modelIds = [...state.filters.modelIds, action.payload];
        },
        unSelectModel: (state, action) => {
            state.filters.modelIds = state.filters.modelIds.filter(id => id !== action.payload);
        },
        selectMaterial: (state, action) => {
            state.filters.materialIds = [...state.filters.materialIds, action.payload];
        },
        unSelectMaterial: (state, action) => {
            state.filters.materialIds = state.filters.materialIds.filter(id => id !== action.payload);
        },
        selectColor: (state, action) => {
            state.filters.colorIds = [...state.filters.colorIds, action.payload];
        },
        unSelectColor: (state, action) => {
            state.filters.colorIds = state.filters.colorIds.filter(id => id !== action.payload);
        },
        selectSize: (state, action) => {
            state.filters.sizeIds = [...state.filters.sizeIds, action.payload];
        },
        unSelectSize: (state, action) => {
            state.filters.sizeIds = state.filters.sizeIds.filter(id => id !== action.payload);
        },

        dropFilters: state => {
            state.filters = initialState.filters;
        },
        toggleFilter: state => {
            state.ifFilterOpened = !state.ifFilterOpened;
        },
        resetProducts: state =>{
            state.products = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogueSettings.fulfilled, (state, actions) =>{
            state.filters.categoryId = actions.payload.categories[0].id;
        });
        builder.addCase(fetchCatalogueItems.fulfilled, (state, action) => {
            state.products.push(...action.payload);
            state.loading = false;
        });
        builder.addCase(fetchCatalogueItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCatalogueItems.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const {
    setCategory,
    selectModel,
    unSelectModel,
    selectMaterial,
    unSelectMaterial,
    selectColor,
    unSelectColor,
    selectSize,
    unSelectSize,
    toggleFilter,
    resetProducts
} = productsSearchSlice.actions;
export { fetchCatalogueItems };

export default productsSearchSlice.reducer;
