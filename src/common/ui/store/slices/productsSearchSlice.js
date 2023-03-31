import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCatalogueItems } from '../../../api';
import { fetchCatalogueSettings } from './catalogueSettingsSlice';

const initialState = {
    loading: true,
    filters: {
        category: null,
        models: [],
        materials: [],
        colors: [],
        sizes: [],
        name: null
    },
    ifFilterOpened: false,
    products: [],
    currentPage: 0,
    totalPages: 0,
    selectedProducts: []
};


const fetchCatalogueItems = createAsyncThunk(
    'productsSearch/fetch',
    async ({ filters, page }) => {
        return await getCatalogueItems(filters, page);
    }
);


export const productsSearchSlice = createSlice({
    name: 'productsSearch',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.category = action.payload;
        },
        selectModel: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.models = [...state.filters.models, action.payload];
        },
        unSelectModel: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.models = state.filters.models.filter(id => id !== action.payload);
        },
        selectMaterial: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.materials = [...state.filters.materials, action.payload];
        },
        unSelectMaterial: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.materials = state.filters.materials.filter(id => id !== action.payload);
        },
        selectColor: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.colors = [...state.filters.colors, action.payload];
        },
        unSelectColor: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.colors = state.filters.colors.filter(id => id !== action.payload);
        },
        selectSize: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.sizes = [...state.filters.sizes, action.payload];
        },
        unSelectSize: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.sizes = state.filters.sizes.filter(id => id !== action.payload);
        },
        unSelectFilter: (state, action) => {
            state.filters[action.payload.type] = state.filters[action.payload.type].filter(id => id !== action.payload.id);
        },

        dropFilters: (state, action) => {
            state.filters = {
                ...initialState.filters,
                category: action.payload.categories[0].id
            };
        },
        toggleFilter: state => {
            state.ifFilterOpened = !state.ifFilterOpened;
        },
        resetProducts: state => {
            state.products = [];
        },
        selectProduct: (state, action) => {
            state.selectedProducts.push(action.payload);
        },
        unSelectProduct: (state, action) => {
            state.selectedProducts = state.selectedProducts.filter(item => item !== action.payload);
        },
        setName: (state, action) =>{
            state.currentPage = 0;
            state.products = [];
            state.filters.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogueSettings.fulfilled, (state, actions) => {
            state.filters.category = actions.payload.categories[0].id;
        });
        builder.addCase(fetchCatalogueItems.fulfilled, (state, action) => {
            state.currentPage = action.payload.currentPage + 1;
            state.totalPages = action.payload.totalPages;
            state.products = [...state.products, ...action.payload.products];
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
    unSelectFilter,
    dropFilters,
    toggleFilter,
    resetProducts,
    selectProduct,
    unSelectProduct,
    setName
} = productsSearchSlice.actions;
export { fetchCatalogueItems };

export default productsSearchSlice.reducer;
