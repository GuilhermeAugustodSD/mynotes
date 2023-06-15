import { createSlice } from "@reduxjs/toolkit";

function actualPage() {
    let route = window.location.pathname
    switch (route) {
      case '/admin':
        return 'Dashboard'
      case '/admin/users':
        return 'Users'
      case '/admin/teams':
        return 'Notes'
    }
  }
  
const initialState = actualPage;

const pageTitle = createSlice({
  name: 'pageTitle',
  initialState,
  reducers: {
    changeNamePage: (state, { payload }) => {
        return state = !state
        
    },
  }
});

export const { changeNamePage } = pageTitle.actions;

export default swichRouteSlice.reducer;