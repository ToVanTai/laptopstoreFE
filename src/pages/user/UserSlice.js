import { getOptionsv2, getOptions } from '../../axios/baseRequest';
import {
    RESET_USER
} from "../../redux/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loading, unLoading } from "../../utils/utils"
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
                state.carts = initState.carts
                state.userAbout = initState.userAbout
                state.purchased = initState.purchased
                let { role_id } = action.payload;
                localStorage.setItem('context', JSON.stringify(action.payload))
                state.roleId = Number(role_id);
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
                    state.carts = action.payload.carts ? action.payload.carts : initState.carts
                    state.userAbout = action.payload.user
                    state.roleId = Number(action.payload.user.role)
                }
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.carts = action.payload
                }
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.carts = action.payload
                }
            })
            .addCase(changeQuantitiesCart.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.carts = action.payload
                }
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.carts = action.payload
                }
            })
            ;
    },
});
const getUserDataAfterLoged = createAsyncThunk(
    "user/addUserDataAfterLoged",
    async (res) => {
        return res;
    }
);

/**
 * xét lại giá trị mặc định của user...giỏ hàng, tt user, loại người dùng
 */
const setUserDataAfterLogout = createAsyncThunk("user/setUserDataAfterLogout", async (url) => {
    let dataRes = true;
    await new Promise((resolve, reject) => {
        fetch(url, getOptions('POST'))
            .then((res) => {
                if (res.status === 200) {
                    resolve();
                    localStorage.removeItem('context')
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

/**lấy thông tin giở hàng, role_id để chuyển sang trang admin, thông tin user */
const getUserDataOnFirstLoad = createAsyncThunk("user/getUserDataOnFirstLoad", async (url) => {
    try {
        const response = await fetch(url, getOptions('GET'));
        if (response.status === 401) {
            // Xử lý lỗi 401 Unauthorized
            return null;
        } else if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            // Xử lý các lỗi khác
            return null;
        }
    } catch (error) {
        // Xử lý lỗi khi gọi fetch
        return null;
    }
})
const addToCart = createAsyncThunk("user/addToCart", async (params) => {
    let dataRes = null;
    await new Promise((resolve, reject) => {

        fetch(params.url, getOptions('POST', JSON.stringify(params.dataBody))).then((res) => {
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
        }).catch(() => reject());
    })
    return dataRes
})
const deleteCart = createAsyncThunk("user/deleteCart", async (data) => {
    let { productId, capacityId, carts, url } = data;
    let indexDel = carts.findIndex(cart => Number(cart.productId) === Number(productId) && Number(cart.capacityId) === Number(capacityId))
    let newCarts = carts.reduce((result, item, index) => {
        if (indexDel !== index) {
            return [...result, item]
        } else {
            return result
        }
    }, [])
    let dataBody = newCarts
    let dataRes = null;
    await new Promise((resolve, reject) => {
        fetch(url, getOptions('POST', JSON.stringify(dataBody))).then((res) => {
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
        }).catch(() => reject());
    })
    return dataRes
})
const changeQuantitiesCart = createAsyncThunk("user/changeQuantitiesCart", async (data) => {
    let dataRes = null;
    let newCarts = [];
    let { productId, capacityId, carts, url, isIncrease } = data;
    let indexChange = carts.findIndex(cart => Number(cart.productId) === Number(productId) && Number(cart.capacityId) === Number(capacityId))
    if (isIncrease) {
        newCarts = carts.reduce((result, item, index) => {
            if (indexChange === index) {
                return [...result, { ...item, quantity: Number(item.quantity) + 1 }]
            } else {
                return [...result, item]
            }
        }, [])
    } else {
        newCarts = carts.reduce((result, item, index) => {
            if (indexChange === index) {
                return [...result, { ...item, quantity: Number(item.quantity) - 1 }]
            } else {
                return [...result, item]
            }
        }, [])
    }
    let dataBody = newCarts
    console.log(dataBody);
    await new Promise((resolve, reject) => {
        fetch(url, getOptions('POST', JSON.stringify(dataBody))).then((res) => {
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
        }).catch(() => reject());
    })
    return dataRes
})
const updateCart = createAsyncThunk("user/updateCartAfterBuyed", async (data) => {
    let dataRes = null;
    //getOptions('POST', JSON.stringify(data.dataBody));
    await new Promise((resolve, reject) => {
        fetch(data.url, getOptions('POST', JSON.stringify(data.dataBody))).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.text().then((res) => {
                    dataRes = JSON.parse(res)
                    data.redirectPurchasedPage()
                    resolve()
                }
                );
            } else {
                res.text().then((res) => {
                    alert(res)
                    reject()
                });
            }
        }).catch(() => reject());
    })
    return dataRes
})
export { getUserDataAfterLoged, setUserDataAfterLogout, getUserDataOnFirstLoad, addToCart, deleteCart, changeQuantitiesCart, updateCart };
export default userSlice;
