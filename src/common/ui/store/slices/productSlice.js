import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCatalogItem from '../../../api/catalogItem/getCatalogItem';

const initialState = {
    product: null,
    productColorImages: null,
    currentColorSize: null,
    uniqueColors: null,
    selectedImage: null,
    mainImageUrl: null,
    loadingImages: [],
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
        },
        setLoadingImages: (state, action) => {
            state.loadingImages = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.productColorImages = action.payload.productColorImages[0];
            state.currentColorSize = action.payload.productColorSizes[0];
            state.uniqueColors = JSON.stringify(Array.from(
                new Map(
                    action.payload.productColorSizes
                        .map((colorSize) => colorSize.color)
                        .map((obj) => [obj.id, obj])
                ).values()
            ));
            state.mainImageUrl = action.payload.mainImageUrl;
            state.selectedImage = {
                imageUrl: action.payload.mainImageUrl,
                index: 0,
            };
            state.loadingImages = Array(action.payload.productColorImages[0].imageURLs.length + 1).fill(false);
        });
        builder.addCase(fetchProduct.pending, (state) => {
            state.loadingImages = [];
        });
        builder.addCase(fetchProduct.rejected, (state) => {
            state.loadingImages = [];
        });
    }
});

export const {
    setSelectedImage,
    setCurrentColorSize,
    setProductColorImages,
    setLoadingImages,
    resetAll,
} = productSlice.actions;
export { fetchProduct };

export default productSlice.reducer;