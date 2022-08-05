import { CHANGE_ABOUT, CHANGE_CARTS, CHANGE_PURCHASED, CHANGE_ROLEID } from "../../redux/constants"
import { createSlice } from "@reduxjs/toolkit"
let initState={
    carts:[],
    userAbout:{},
    purchased:[],
    roleId:null
}
let userSlice = createSlice({
    name:"user",
    initialState:initState,
    reducers: {

    }
})
export default userSlice