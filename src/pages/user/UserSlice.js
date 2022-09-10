import {
    RESET_USER
} from "../../redux/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let initState = {
    carts: [],//for login
    userAbout: {},//for login
    purchased: [],//for login
    roleId: null,//for login
};
let userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        [RESET_USER]: (state, action) => {
            state.carts = initState.carts
            state.userAbout = initState.userAbout
            state.purchased = initState.purchased
            state.roleId = initState.roleId
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataAfterLoged.fulfilled, (state, action) => {
                state.carts = action.payload.carts
                state.userAbout = action.payload.user
                state.roleId = Number(action.payload.user.role)
            })
            .addCase(getUserDataAfterLoged.rejected, (state) => {
                state = initState;
            })
            .addCase(setUserDataAfterLogout.fulfilled, (state) => {
                state.carts = initState.carts
                state.userAbout = initState.userAbout
                state.purchased = initState.purchased
                state.roleId = initState.roleId
            })
            .addCase(getUserDataOnFirstLoad.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.carts = action.payload.carts
                    state.userAbout = action.payload.user
                    state.roleId = Number(action.payload.user.role)
                }
            })
            .addCase(addToCart.fulfilled, (state, action)=>{
                if(action.payload!==null){
                    alert("Thêm thành công!")
                    state.carts = action.payload
                }
            })
            .addCase(deleteCart.fulfilled,(state, action)=>{
                if(action.payload!==null){
                    state.carts = action.payload
                }
            })
            .addCase(changeQuantitiesCart.fulfilled,(state, action)=>{
                if(action.payload!==null){
                    state.carts = action.payload
                }
            })
            ;
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
                    reject();
                });
        });
        return dataRes;
    }
);
const setUserDataAfterLogout = createAsyncThunk("user/setUserDataAfterLogout", async (url) => {
    let dataRes = true;
    await new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 200) {
                    resolve()
                } else {
                    dataRes = false
                    reject()
                }
            })
            .catch((err) => {
                dataRes = false
                reject()
            });
    });
    return dataRes;
})
const getUserDataOnFirstLoad = createAsyncThunk("user/getUserDataOnFirstLoad", async (url) => {
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
                reject();
            });
    });
    return dataRes;
})
const addToCart = createAsyncThunk("user/addToCart", async (params) => {
    let dataRes = null;
    await new Promise((resolve, reject) => {
        fetch(params.url, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(params.dataBody),
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.text().then((res) => {
                        dataRes = JSON.parse(res)
                        resolve()
                    }
                );
            } else {
                res.text().then((res) => {
                    alert(res) 
                    reject()
                });
            }
        }).catch(()=>reject());
    })
    return dataRes
})
const deleteCart = createAsyncThunk("user/deleteCart",async (data)=>{
    let {productId, capacityId,carts,url} = data;
    let indexDel = carts.findIndex(cart=>Number(cart.productId)===Number(productId)&&Number(cart.capacityId)===Number(capacityId))
    let newCarts = carts.reduce((result,item,index)=>{
        if(indexDel!==index){
            return [...result,item]
        }else{
            return result
        }
    },[])
    let dataBody =newCarts
    let dataRes = null;
    await new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataBody),
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.text().then((res) => {
                        dataRes = JSON.parse(res)
                        resolve()
                    }
                );
            } else {
                res.text().then((res) => {
                    alert(res) 
                    reject()
                });
            }
        }).catch(()=>reject());
    })
    return dataRes
})
const changeQuantitiesCart = createAsyncThunk("user/changeQuantitiesCart",async (data)=>{
    let dataRes = null;
    let newCarts=[];
    let {productId, capacityId,carts,url,isIncrease} = data;
    let indexChange = carts.findIndex(cart=>Number(cart.productId)===Number(productId)&&Number(cart.capacityId)===Number(capacityId))
    if(isIncrease){
        newCarts = carts.reduce((result,item,index)=>{
                if(indexChange===index){
                    return [...result,{...item,quantity:Number(item.quantity)+1}]
                }else{
                    return [...result,item]
                }
            },[])
    }else{
        newCarts = carts.reduce((result,item,index)=>{
            if(indexChange===index){
                return [...result,{...item,quantity:Number(item.quantity)-1}]
            }else{
                return [...result,item]
            }
        },[])
    }
    let dataBody = newCarts
    console.log(dataBody);
    await new Promise((resolve, reject) => {
    fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(dataBody),
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((res) => {
                    dataRes = JSON.parse(res)
                    resolve()
                }
            );
        } else {
            res.text().then((res) => {
                alert(res) 
                reject()
            });
        }
    }).catch(()=>reject());
    })
    return dataRes
})
export { getUserDataAfterLoged, setUserDataAfterLogout, getUserDataOnFirstLoad, addToCart, deleteCart,changeQuantitiesCart };
export default userSlice;
