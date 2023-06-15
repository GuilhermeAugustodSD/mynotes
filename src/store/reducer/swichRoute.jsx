import { createSlice } from "@reduxjs/toolkit";

const actualRoute = window.location.pathname;
const regExp = /admin/mg;

const initialState = regExp.test(actualRoute) ? true : false;

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