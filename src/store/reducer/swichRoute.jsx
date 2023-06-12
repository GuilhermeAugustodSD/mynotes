import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const swichRouteSlice = createSlice({
  name: 'swichRoute',
  initialState,
  reducers: {
    changeRoute: (state, { payload }) => {
        return state = !state
        
    },
  }
});

export const { changeRoute } = swichRouteSlice.actions;

export default swichRouteSlice.reducer;