import { configureStore } from "@reduxjs/toolkit";
import bookStoreReducer from "./bookStore/bookStoreSlice.ts";
import shoppingCartReducer from "./shoppingCart/shoppingCartSlice.ts";
import userReducer from "./user/userSlice.ts";

const store = configureStore({
	reducer: {
		bookStore: bookStoreReducer,
		shoppingCart: shoppingCartReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
