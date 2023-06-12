import { configureStore } from "@reduxjs/toolkit";
import buscaSlice from './reducer/busca'
import swichRoutwSlice from './reducer/swichRoute'

const store = configureStore({
    reducer:{
        busca: buscaSlice,
        swichRoute: swichRoutwSlice
    }
})

export default store