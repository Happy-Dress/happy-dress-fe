import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previousRoute: null,
    currentRoute: null
};

export const routeTrackerSlice = createSlice({
    name: 'routeTracker',
    initialState,
    reducers:{
        setPreviousRoute: (state, action) => {
            state.previousRoute = action.payload;
        },
    }
});

export const {
    setPreviousRoute
} = routeTrackerSlice.actions;

export default routeTrackerSlice.reducer;