import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCatalogItem from '../../../api/catalogItem/getCatalogItem';

const initialState = {
    product: null,
    productColorImages: null,
    currentColorSize: null,
    uniqueColors: null,
    selectedImage: null,
    mainImage: null,
};

const fetchProduct = createAsyncThunk(
    'product/fetch',
    async ({ productId }) => {
        return await getCatalogItem(productId);
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        setCurrentColorSize: (state, action) => {
            state.currentColorSize = action.payload;
        },
        setProductColorImages: (state, action) => {
            state.productColorImages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.productColorImages = action.payload.productColorImages[0];
            state.currentColorSize = action.payload.productColorSizes[0];
            state.uniqueColors = JSON.stringify(new Set(action.payload.productColorSizes.map(item => item.color.name)));
            state.mainImage = action.payload.mainImageUrl;
            state.selectedImage = {
                imageUrl: action.payload.mainImageUrl,
                index: 0,
            };
        });
    }
});

export const {
    setSelectedImage,
    setCurrentColorSize,
    setProductColorImages,
} = productSlice.actions;
export { fetchProduct };

export default productSlice.reducer;