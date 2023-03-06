import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCatalogueItems } from '../../../api';
import { fetchCatalogueSettings } from './catalogueSettingsSlice';
import { __STORE_BASIC_VARIABLES } from '../storeVariables';

const {
    BASIC_CATEGORY_NAME
} = __STORE_BASIC_VARIABLES;

const initialState = {
    loading: false,
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
};


const fetchCatalogueItems = createAsyncThunk(
    'productsSearch/fetch',
    async (filters) => {

        return await getCatalogueItems(filters);
    }
);


export const productsSearchSlice = createSlice({
    name: 'productsSearch',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.filters.category = action.payload;
        },
        selectModel: (state, action) => {
            state.filters.models = [...state.filters.models, action.payload];
        },
        unSelectModel: (state, action) => {
            state.filters.models = state.filters.models.filter(id => id !== action.payload);
        },
        selectMaterial: (state, action) => {
            state.filters.materials = [...state.filters.materials, action.payload];
        },
        unSelectMaterial: (state, action) => {
            state.filters.materials = state.filters.materials.filter(id => id !== action.payload);
        },
        selectColor: (state, action) => {
            state.filters.colors = [...state.filters.colors, action.payload];
        },
        unSelectColor: (state, action) => {
            state.filters.colors = state.filters.colors.filter(id => id !== action.payload);
        },
        selectSize: (state, action) => {
            state.filters.sizes = [...state.filters.sizes, action.payload];
        },
        unSelectSize: (state, action) => {
            state.filters.sizes = state.filters.sizes.filter(id => id !== action.payload);
        },
        unSelectFilter: (state, action) => {
            state.filters[action.payload.type] = state.filters[action.payload.type].filter(id => id !== action.payload.id);
        },

        dropFilters: (state, action) => {
            state.filters = {
                ...initialState.filters,
                category: action.payload.categories.find(item => item.name === BASIC_CATEGORY_NAME).id
            };
        },
        toggleFilter: state => {
            state.ifFilterOpened = !state.ifFilterOpened;
        },
        resetProducts: state => {
            state.products = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogueSettings.fulfilled, (state, actions) => {
            state.filters.category = actions.payload.categories.find(item => item.name === BASIC_CATEGORY_NAME).id;
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
    unSelectFilter,
    dropFilters,
    toggleFilter,
    resetProducts
} = productsSearchSlice.actions;
export { fetchCatalogueItems };

export default productsSearchSlice.reducer;
