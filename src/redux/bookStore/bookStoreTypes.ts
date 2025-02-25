export interface Book {
	id: number;
	title: string;
	author: string;
	price: number;
	stock: number;
}

export interface BookStoreState {
	books: Book[];
}
