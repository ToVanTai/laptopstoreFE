// import filtersSlice from "../components/Filters/filtersSlice"
// import todoListSlice from "../components/TodoList/todoListSlice"
import { configureStore } from "@reduxjs/toolkit"
const store = configureStore({
    reducer:{
        // "filters":filtersSlice.reducer,
        // "todoList": todoListSlice.reducer
    }
})
export default store
