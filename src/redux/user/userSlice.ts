import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./userTypes.ts";

const initialState: UserState = {
	firstName: "",
	lastName: "",
	email: "",
	dateOfBirth: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			return action.payload;
		},
		clearUser() {
			return initialState;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
