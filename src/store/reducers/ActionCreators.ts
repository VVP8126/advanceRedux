import { AppDispatch } from "../store";
import axios from "axios";
import { IUser } from "../../model/IUser";
import { userSlice } from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Standard realization
export const fetchUsers = () => async(dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetchUsers());
        const responce = await axios.get<IUser[]>("http://jsonplaceholder.typicode.com/users");
        dispatch(userSlice.actions.fetchUsersSuccess(responce.data));
    } catch (error) {
        console.log(error);
        dispatch(userSlice.actions.fetchUsersError("Error while users fetching"));
    }
}

// Realization with Redux Toolkit
export const loadUsers = createAsyncThunk(
    "user/fetchAll",
    async (_, thunkAPI) => {
        try {
            const responce = await axios.get<IUser[]>("http://jsonplaceholder.typicode.com/users");
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed load information with users !!!");
        }
        
    }
)
