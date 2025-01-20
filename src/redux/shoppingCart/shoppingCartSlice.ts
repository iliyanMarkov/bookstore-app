import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ShoppingCartState } from "./shoppingCartTypes.ts";
import { updateCurrentBook } from "../bookStore/bookStoreActions.ts";

const initialState: ShoppingCartState = {
	items: [],
	total: 0,
};

const shoppingCartSlice = createSlice({
	name: "shoppingCart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);

			if (existingItem) {
				if (existingItem.quantity !== action.payload.stock) {
					existingItem.quantity += 1;
					state.total += action.payload.price;
				}
			} else {
				state.items.push({
					...action.payload,
					quantity: 1,
				});
				state.total += action.payload.price;
			}
		},
		removeItem(state, action: PayloadAction<CartItem>) {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.items.splice(index, 1);
			}

			state.total = state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
		},
		updateQuantity(
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) {
			const item = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (item) {
				item.quantity = action.payload.quantity;
			}
			state.total = state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
		},
		clearCart(state) {
			state.items = [];
			state.total = 0;
		},
	},
});

export const { addItem, removeItem, updateQuantity, clearCart } =
	shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
