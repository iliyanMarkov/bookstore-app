import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookStoreState } from "./bookStoreTypes.ts";

const initialState: BookStoreState = {
	books: [],
};

const bookStoreSlice = createSlice({
	name: "bookStore",
	initialState,
	reducers: {
		setBooks(state, action: PayloadAction<Book[]>) {
			state.books = action.payload;
		},
		addBook(state, action: PayloadAction<Book>) {
			state.books.push(action.payload);
		},
		removeBook(state, action: PayloadAction<Book>) {
			state.books = state.books.filter(
				(book) => book.id !== action.payload.id
			);
		},
		updateBook(state, action: PayloadAction<Book>) {
			const currentBook = state.books.find(
				(b) => b.id === action.payload.id
			);
			if (currentBook) {
				Object.assign(currentBook, action.payload);
			}
		},
	},
});

export const { setBooks, addBook, removeBook, updateBook } =
	bookStoreSlice.actions;
export default bookStoreSlice.reducer;
