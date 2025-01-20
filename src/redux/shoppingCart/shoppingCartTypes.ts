import { Book } from "../bookStore/bookStoreTypes.ts";

export interface CartItem extends Book {
	quantity: number;
}

export interface ShoppingCartState {
	items: CartItem[];
	total: number;
}
