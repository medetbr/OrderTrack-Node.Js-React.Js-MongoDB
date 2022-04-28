import {configureStore} from "@reduxjs/toolkit";
import shopSlice from "./reducer/shop";
import userSlice from "./reducer/user";

export const store = configureStore({
   reducer: {
       users:userSlice,
       shops:shopSlice,
   }, 
})