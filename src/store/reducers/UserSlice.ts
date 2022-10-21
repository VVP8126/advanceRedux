import { IUser } from "../../model/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { fetchUsers, loadUsers } from "./ActionCreators";

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
    counter: number;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: "",
    counter: 0,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.counter += action.payload;
        },
        fetchUsers(state) {
            state.isLoading = true;
        },
        fetchUsersSuccess(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false;
            state.error = "";
            state.users = action.payload;
        },
        fetchUsersError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
    extraReducers: { // These actions are added with Redux Toolkit
        [loadUsers.fulfilled.type]:  (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = "";
            state.users = action.payload;
        },
        [loadUsers.pending.type]:  (state) => {
            state.isLoading = true;
        },
        [loadUsers.rejected.type]:  (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default userSlice.reducer;
