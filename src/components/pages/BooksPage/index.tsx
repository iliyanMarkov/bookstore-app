import React, { useState } from "react";
import { Table, Input, Button, Flex } from "antd";
import { Book } from "../../../redux/bookStore/bookStoreTypes.ts";
import { useBookStore } from "../../../redux/bookStore/bookStoreSelectors.ts";
import { addBookInShoppingCart } from "../../../redux/shoppingCart/shoppingCartActions.ts";

const BooksPage: React.FC = () => {
	const bookStore = useBookStore();

	const [search, setSearch] = useState("");

	const filteredBooks = bookStore.books.filter(
		(book) =>
			book.title.toLowerCase().includes(search.toLowerCase()) ||
			book.author.toLowerCase().includes(search.toLowerCase())
	);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Author",
			dataIndex: "author",
			key: "author",
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "stock",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (price: number) => `$${price.toFixed(2)}`,
		},
		{
			title: "",
			key: "actions",
			render: (_: any, record: Book) => (
				<Button
					type="primary"
					onClick={() => addBookInShoppingCart(record)}
					disabled={record.stock <= 0}
				>
					Add to Cart
				</Button>
			),
		},
	];

	return (
		<Flex vertical={true} align="flex-end">
			<Input.Search
				placeholder="Search books..."
				style={{ marginBottom: 16, maxWidth: "300px" }}
				allowClear
				onSearch={(value) => setSearch(value)}
			/>
			<Table
				style={{ whiteSpace: "nowrap" }}
				dataSource={filteredBooks}
				columns={columns}
				rowKey="id"
				pagination={false}
				scroll={{ x: "max-content", y: "calc(100vh - 200px)" }}
			/>
		</Flex>
	);
};

export default BooksPage;
