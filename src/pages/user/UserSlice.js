import {
    CHANGE_ABOUT,
    CHANGE_CARTS,
    CHANGE_PURCHASED,
    CHANGE_ROLEID,
} from "../../redux/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let initState = {
    carts: [],
    userAbout: {},
    purchased: [],
    roleId: null,
};
let userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataAfterLoged.fulfilled, (state, action) => {
                state.carts=action.payload.carts
                state.userAbout=action.payload.user
                state.roleId=Number(action.payload.user.role)
            })
            .addCase(getUserDataAfterLoged.rejected, (state) => {
                state = initState;
            })
            .addCase(setUserDataAfterLogout.fulfilled, (state)=>{
                state.carts = initState.carts
                state.userAbout = initState.userAbout
                state.purchased = initState.purchased
                state.roleId = initState.roleId
            })
            .addCase(getUserDataOnFirstLoad.fulfilled, (state, action)=>{
                if(action.payload!==null){
                    state.carts=action.payload.carts
                    state.userAbout=action.payload.user
                    state.roleId=Number(action.payload.user.role)
                }
            })
            .addCase(setUserDataAfterChangePassword.fulfilled, (state,action)=>{
                // state.carts = initState.carts
                // state.userAbout = initState.userAbout
                // state.purchased = initState.purchased
                // state.roleId = initState.roleId
                // alert(action.payload)
            });
    },
});
const getUserDataAfterLoged = createAsyncThunk(
    "user/addUserDataAfterLoged",
    async (url) => {
        let dataRes = null;
        await new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => {
                    if (res.status === 203) {
                    } else {
                        res.text().then((res) => {
                            dataRes = JSON.parse(res);
                            resolve();
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });
        return dataRes;
    }
);
const setUserDataAfterLogout = createAsyncThunk("user/setUserDataAfterLogout", async (url)=>{
    let dataRes = true;
        await new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                credentials: "include",
            })
                .then((res) => {
                    if(res.status===200){
                        resolve()
                    }else{
                        dataRes = false
                        reject()
                    }
                })
                .catch((err) => {
                    console.log(err);
                        dataRes = false
                        reject()
                });
        });
        return dataRes;
})
const getUserDataOnFirstLoad = createAsyncThunk("user/getUserDataOnFirstLoad", async(url)=>{
    let dataRes = null;
        await new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => {
                    if (res.status === 203) {
                    } else {
                        res.text().then((res) => {
                            dataRes = JSON.parse(res);
                            resolve();
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });
        return dataRes;
})
const setUserDataAfterChangePassword = createAsyncThunk("user/setUserDataAfterChangePassword", async(url, data)=>{
    let isSuccess = true;
    await new Promise((resolve, reject)=>{
        fetch(url, {
            method: "POST",
            body: data,
            credentials: "include"
        }).then(res=>{
            // if(res.status===200||res.status===201){
            //     res.text().then(res=>{
            //         isSuccess=res
            //         resolve()
            //     })
            // }else{
            //     res.text().then(res=>{
            //         isSuccess=res
            //         alert(res)
            //         reject()
            //     })
            // }
            res.text().then(res=>console.log(res))
        }).catch(err=>console.log(err))
    })
    return isSuccess
})
export { getUserDataAfterLoged, setUserDataAfterLogout, getUserDataOnFirstLoad, setUserDataAfterChangePassword };
export default userSlice;
