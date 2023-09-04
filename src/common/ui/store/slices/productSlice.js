import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCatalogItem from '../../../api/catalogItem/getCatalogItem';

const initialState = {
    product: null,
    productColorImages: null,
    currentColorSize: null,
    uniqueColors: null,
    selectedImage: null,
};

const fetchProduct = createAsyncThunk(
    'product/fetch',
    async ({ productId, isSecure }) => {
        return await getCatalogItem(productId, isSecure);
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
        resetProduct: (state) => {
            state.product = initialState.product;
            state.productColorImages = initialState.productColorImages;
            state.currentColorSize = initialState.currentColorSize;
            state.uniqueColors = initialState.uniqueColors;
            state.selectedImage = initialState.selectedImage;
        }
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
            state.selectedImage = {
                imageUrl: action.payload.productColorImages[0].imageURLs[0],
                index: Date.now(),
            };
        });
    }
});

export const {
    setSelectedImage,
    setCurrentColorSize,
    setProductColorImages,
    setLoadingImages,
    resetProduct,
} = productSlice.actions;
export { fetchProduct };

export default productSlice.reducer;