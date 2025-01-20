import { setBooks, updateBook } from "./bookStoreSlice.ts";
import { Book } from "./bookStoreTypes.ts";
import store from "../store.ts";
import axios from "axios";

export const fetchBooks = async () => {
	try {
		const response = await fetch("http://localhost:5000/books");
		const data: Book[] = await response.json();
		store.dispatch(setBooks(data));
	} catch (error) {
		console.error("Error fetching books:", error);
	}
};

export const postBooks = async (books: Book[]) => {
	try {
		const existingBooks = await axios.get("http://localhost:5000/books");
		for (const book of existingBooks.data) {
			await axios.delete(`http://localhost:5000/books/${book.id}`);
		}

		for (const book of books) {
			await axios.post("http://localhost:5000/books", book);
		}

		store.dispatch(setBooks(books));
	} catch (error) {
		console.error("Error posting books:", error);
	}
};

export const updateCurrentBook = (book: Book) => {
	store.dispatch(updateBook(book));
};
