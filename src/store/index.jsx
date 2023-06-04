import { configureStore } from "@reduxjs/toolkit";
import buscaSlice from './reducer/busca'

const store = configureStore({
    reducer:{
        busca: buscaSlice
    }
})

export default store