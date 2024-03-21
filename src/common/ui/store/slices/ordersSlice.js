import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        }
    }
});

export const { setCount } = ordersSlice.actions;

export default ordersSlice.reducer;