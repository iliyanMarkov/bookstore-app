import axios from "axios";
import { excludeKey } from "../../commonFunctions/exclusion.ts";
import { postBooks, updateCurrentBook } from "../bookStore/bookStoreActions.ts";
import { updateBook } from "../bookStore/bookStoreSlice.ts";
import { Book } from "../bookStore/bookStoreTypes.ts";
import store from "../store.ts";
import {
	addItem,
	clearCart,
	removeItem,
	updateQuantity,
} from "./shoppingCartSlice.ts";
import { CartItem } from "./shoppingCartTypes.ts";
import { message } from "antd";

export const addBookInShoppingCart = (book: Book) => {
	if (book.stock > 0) {
		store.dispatch(
			addItem({
				...book,
				quantity: 1,
			})
		);

		store.dispatch(updateBook({ ...book, stock: book.stock - 1 }));
	}
};

export const removeBookFromShoppingCart = (book: CartItem) => {
	store.dispatch(removeItem(book));
};
export const updateBookShoppingCartQuantity = (book: CartItem) => {
	store.dispatch(updateQuantity({ id: book.id, quantity: book.quantity }));
};
export const clearShoppingCart = () => {
	store.dispatch(clearCart());
};

export const purchaseShoppingCartItems = async ({
	shoppingCart,
	bookStore,
	user,
}) => {
	try {
		shoppingCart.items.forEach((item) => {
			updateCurrentBook({
				...excludeKey(item, "quantity"),
				stock: item.stock - item.quantity,
			} as Book);
		});

		const orderData = {
			items: shoppingCart.items.map((item) => ({
				id: item.id,
				title: item.title,
				quantity: item.quantity,
				price: item.price,
			})),
			total: shoppingCart.total,
			date: new Date().toISOString(),
			user: user,
		};

		const response = await axios.post(
			"http://localhost:5000/orders",
			orderData
		);

		if (response.status === 201) {
			await postBooks(bookStore.books);

			clearShoppingCart();

			message.success("Order Submitted!");
		} else {
			throw new Error("Failed to save order");
		}
	} catch (error) {
		console.error("Error submitting order:", error);
		message.error("Failed to submit order. Please try again.");
	}
};
