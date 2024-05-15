import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCatalogItem from '../../../api/catalogItem/getCatalogItem';

const initialState = {
    count: 0,
    loading: false,
};

const fetchOrderProduct = createAsyncThunk(
    'product/fetch',
    async ({ productId, isSecure }) => {
        return await getCatalogItem(productId, isSecure);
    }
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrderProduct.fulfilled, (state, action) => {
            state.loading = false;
        });
    }
});

export const { setCount } = ordersSlice.actions;
export { fetchOrderProduct };
export default ordersSlice.reducer;