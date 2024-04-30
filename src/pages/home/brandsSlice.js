import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let initState = {
    "count": 0,
    "data":null
}
let brandsSlice = createSlice({
    name: "brands",
    initialState: initState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(getBrandsDataOnFirstLoad.fulfilled, (state, action)=>{
            state.count = action.payload.count
            state.data = action.payload.data
        })
    }
    
})

/**lấy thông tin slide chạy .... */
const getBrandsDataOnFirstLoad = createAsyncThunk("brands/getBrandsDataOnFirstLoad", async(url)=>{
    let dataRes = null;
    await new Promise((resolve, reject)=>{
        fetch(url,{
            method: "GET",
        }).then((res)=>{
            if(res.status===200||res.status===201){
                res.json().then(res=>{
                    dataRes=res
                    resolve()
                })
            }else{
                reject()
            }
        }).catch(err=>console.log(err))
    })
    return dataRes
})
export default brandsSlice
export {getBrandsDataOnFirstLoad}