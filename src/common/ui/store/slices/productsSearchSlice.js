import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCatalogItems } from '../../../api';
import { fetchCatalogueSettings } from './catalogueSettingsSlice';
import { deleteCatalogItems } from '../../../api/catalogItems/deleteCatalogItems';
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
    async ({ filters, page, isSecure }) => {
        return await getCatalogItems(filters, page, isSecure);
    }
);

const deleteProducts = createAsyncThunk(
    'productsSearch/delete',
    async ({ selectedProducts }, { rejectWithValue }) => {
        try {
            await deleteCatalogItems(selectedProducts);
            return selectedProducts;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const productsSearchSlice = createSlice({
    name: 'productsSearch',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            if(action.payload.shouldDropProducts) {
                state.currentPage = 0;
            }
            state.filters.category = action.payload.category;
        },
        selectModel: (state, action) => {
            state.currentPage = 0;
            state.filters.models = [...state.filters.models, action.payload];
        },
        unSelectModel: (state, action) => {
            state.currentPage = 0;
            state.filters.models = state.filters.models.filter(id => id !== action.payload);
        },
        selectMaterial: (state, action) => {
            state.currentPage = 0;
            state.filters.materials = [...state.filters.materials, action.payload];
        },
        unSelectMaterial: (state, action) => {
            state.currentPage = 0;
            state.filters.materials = state.filters.materials.filter(id => id !== action.payload);
        },
        selectColor: (state, action) => {
            state.currentPage = 0;
            state.filters.colors = [...state.filters.colors, action.payload];
        },
        unSelectColor: (state, action) => {
            state.currentPage = 0;
            state.filters.colors = state.filters.colors.filter(id => id !== action.payload);
        },
        selectSize: (state, action) => {
            state.currentPage = 0;
            state.filters.sizes = [...state.filters.sizes, action.payload];
        },
        unSelectSize: (state, action) => {
            state.currentPage = 0;
            state.filters.sizes = state.filters.sizes.filter(id => id !== action.payload);
        },
        unSelectFilter: (state, action) => {
            state.currentPage = 0;
            state.filters[action.payload.type] = state.filters[action.payload.type].filter(id => id !== action.payload.id);
        },
        dropFilters: (state, action) => {
            state.currentPage = 0;
            state.filters = {
                ...initialState.filters,
                category: action.payload.categories[0].id,
                name: state.filters.name,
            };
        },
        toggleFilter: state => {
            state.ifFilterOpened = !state.ifFilterOpened;
        },
        resetProducts: state => {
            state.products = [];
        },
        setLoading: state => {
            state.loading = true;
        },
        selectProduct: (state, action) => {
            state.selectedProducts.push(action.payload);
        },
        unSelectProduct: (state, action) => {
            state.selectedProducts = state.selectedProducts.filter(item => item !== action.payload);
        },
        resetSelectedProducts: (state) => {
            state.selectedProducts = [];
        },
        setName: (state, action) => {
            state.currentPage = 0;
            state.products = [];
            state.filters.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

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
    resetFilters,
    dropFilters,
    toggleFilter,
    resetProducts,
    setLoading,
    selectProduct,
    unSelectProduct,
    resetSelectedProducts,
    setName
} = productsSearchSlice.actions;
export { fetchCatalogueItems, deleteProducts };

export default productsSearchSlice.reducer;
