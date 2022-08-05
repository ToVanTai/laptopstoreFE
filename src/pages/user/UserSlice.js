import { CHANGE_ABOUT, CHANGE_CARTS, CHANGE_PURCHASED, CHANGE_ROLEID } from "../../redux/constants"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
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

    },
    extraReducers: (builder)=>{
        builder.addCase(getUserDataAfterLoged.fulfilled, (state, action)=>{
            console.log(action)
        })
        .addCase(getUserDataAfterLoged.rejected,(state)=>{
            state=initState
        })
    }
})
const getUserDataAfterLoged = createAsyncThunk('user/addUserDataAfterLoged', async(url)=>{
    let dataRes=null
    await new Promise((resolve, reject)=>{
        fetch(url,{
            method: "GET",
            credentials: "include"
        }).then(res=>{
            if(res.status===203){
                return dataRes
            }else{
                res.text().then(res=>{
                    dataRes=JSON.parse(res)
                })
            }
        }).catch(err=>console.log(err))
    })
    return dataRes
})
export {getUserDataAfterLoged}
export default userSlice