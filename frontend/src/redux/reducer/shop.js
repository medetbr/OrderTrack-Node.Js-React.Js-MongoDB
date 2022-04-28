import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


// export const createUserAsync = createAsyncThunk("users/createUserAsync",async (data)=>{
//     const res = await axios.post("http://localhost:5000/api/users/",data)
//         localStorage.setItem("userInfo",JSON.stringify(res.data))
//         return res  
// })
export const getShopAsync = createAsyncThunk("shops/getShopAsync",async (id)=>{
    const res = await axios.get(`http://localhost:5000/api/shops/${id}`)
    localStorage.setItem("shopInfo",JSON.stringify(res.data))
    return res.data
})
// export const updateUserAsync = createAsyncThunk("users/updateUserAsync",async (data)=>{
//     const {user_id,...others} = data 
//         await axios.patch(`http://localhost:5000/api/users/${data.user_id}`, others).then((res)=>{
//         localStorage.setItem("userInfo",JSON.stringify(res.data))
//         })
// })
export const shopSlice = createSlice({
    name: "shops",
    initialState: {
        shopInfo: localStorage.getItem("shopInfo") ? 
        JSON.parse(localStorage.getItem("shopInfo")) :null,
        isLoading: false,
        error: null
    },
    reducers: {
        
    },
    extraReducers: {
        //get shop
        [getShopAsync.pending]:(state,action)=>{
            state.isLoading = true;
        },
        [getShopAsync.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.shopInfo = action.payload;
        },
        [getShopAsync.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = "Hatalı giriş yapıldı. Lütfen bilgilerinizi doğru yazdığınızdan emin olun.";
        },
        // // create user
        // [createUserAsync.pending]:(state,action)=>{
        //     state.createUser.isLoading = true;
        // },
        // [createUserAsync.fulfilled]:(state,action)=>{
        //     state.createUser.isLoading = false;
        //     state.userInfo = action.payload.data;
        // },
        // [createUserAsync.rejected]:(state,action)=>{
        //     state.createUser.isLoading = false;
        //     state.createUser.error = "Üye oluşturulurken hata oluştu. Lütfen bilgilerinizi doğru yazdığınızdan emin olun.";
        // },
        // //update
        // [updateUserAsync.pending]:(state,action)=>{
        //     state.isLoading = true;
        // },
        // [updateUserAsync.fulfilled]:(state,action)=>{
        //     state.isLoading = false;
        //     state.successful = "Üye başarılı bir şekilde güncellendi"
        // },
        // [updateUserAsync.rejected]:(state,action)=>{
        //     state.isLoading = false;
        //     state.error = "Üye güncellenirken bir hata oluştu. Lütfen bilgilerinizi doğru yazdığınızdan emin olun.";
        // },
    }
})
// export const {exitUser,} = shopSlice.actions
export default shopSlice.reducer