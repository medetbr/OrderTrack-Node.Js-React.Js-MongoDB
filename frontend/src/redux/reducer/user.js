import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


export const createUserAsync = createAsyncThunk("users/createUserAsync",async (data)=>{
    const res = await axios.post("http://localhost:5000/api/users/",data)
        localStorage.setItem("userInfo",JSON.stringify(res.data))
        return res  
})
export const getUserAsync = createAsyncThunk("users/getUserAsync",async (data)=>{
    const res = await axios.post("http://localhost:5000/api/users/login",data)
    localStorage.setItem("userInfo",JSON.stringify(res.data))
    return res.data
})
export const updateUserAsync = createAsyncThunk("users/updateUserAsync",async (data)=>{
    const {user_id,...others} = data 
       const res = await axios.patch(`http://localhost:5000/api/users/${data.user_id}`, others)
       localStorage.setItem("userInfo",JSON.stringify(res.data))  
       return res.data   
})
export const userSlice = createSlice({
    name: "users",
    initialState: {
        userInfo: localStorage.getItem("userInfo") ? 
        JSON.parse(localStorage.getItem("userInfo")) :null,
        isLoading: false,
        error: null,
        successful: null,
        createUser:{
            isLoading:false,
            error: null,
        }
    },
    reducers: {
        // loginUser :(state,action)=>{
        //     const fetchUser = async ()=>{
        //         const res = await axios.post("http://localhost:5000/api/users/login",action.payload)
        //         //console.log(res.data)
        //         state.userInfo = "dsfdsf"           
        //     }
        //     fetchUser()  
        // },
        exitUser :(state,action)=>{
                 state.userInfo = null
                 localStorage.removeItem("userInfo")
                 
        }
    },
    extraReducers: {
        //get user
        [getUserAsync.pending]:(state,action)=>{
            state.isLoading = true;
        },
        [getUserAsync.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.userInfo = action.payload;
        },
        [getUserAsync.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = "Hatal?? giri?? yap??ld??. L??tfen bilgilerinizi do??ru yazd??????n??zdan emin olun.";
        },
        // create user
        [createUserAsync.pending]:(state,action)=>{
            state.createUser.isLoading = true;
        },
        [createUserAsync.fulfilled]:(state,action)=>{
            state.createUser.isLoading = false;
            state.userInfo = action.payload.data;
        },
        [createUserAsync.rejected]:(state,action)=>{
            state.createUser.isLoading = false;
            state.createUser.error = "??ye olu??turulurken hata olu??tu. L??tfen bilgilerinizi do??ru yazd??????n??zdan emin olun.";
        },
        //update
        [updateUserAsync.pending]:(state,action)=>{
            state.isLoading = true;
        },
        [updateUserAsync.fulfilled]:(state,action)=>{
            state.isLoading = false;            
            state.userInfo = action.payload;
            state.successful = "??ye ba??ar??l?? bir ??ekilde g??ncellendi"
        },
        [updateUserAsync.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = "??ye g??ncellenirken bir hata olu??tu. L??tfen bilgilerinizi do??ru yazd??????n??zdan emin olun.";
        },
    }
})
export const {exitUser,} = userSlice.actions
export default userSlice.reducer