import overlaySlice from "../components/OverlaySlice"
import sideBarSlice from "../components/SidebarSlice"
import { configureStore } from "@reduxjs/toolkit"
const store = configureStore({
    reducer : {
        sideBar: sideBarSlice.reducer,
        overlay: overlaySlice.reducer
    }
})
export default store;