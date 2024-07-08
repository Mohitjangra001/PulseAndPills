import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../Reducer/Slices/authSlice'
import profileReducer from "./Slices/profileSlice";
import cartReducer from "./Slices/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    Profile:profileReducer,
    Cart:cartReducer,
})

export default rootReducer;