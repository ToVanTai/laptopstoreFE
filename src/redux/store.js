import overlaySlice from "../components/OverlaySlice"
import sideBarSlice from "../components/SidebarSlice"
import userSlice from "../pages/user/UserSlice"
import { configureStore } from "@reduxjs/toolkit"
const store = configureStore({
    reducer : {
        sideBar: sideBarSlice.reducer,
        overlay: overlaySlice.reducer,
        user: userSlice.reducer
    }
})
export default store;