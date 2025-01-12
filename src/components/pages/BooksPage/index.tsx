import React from "react";
import { Table, Input, Flex, GetProps } from "antd";
import apiData from "../../../mock-data/apiData.js";

type SearchProps = GetProps<typeof Input.Search>;

const BooksPage: React.FC<{
	books: typeof apiData;
	search: string;
	onSearch: SearchProps["onSearch"];
	columns: any;
}> = ({ books, search, onSearch, columns }) => (
	<Flex vertical={true} align="flex-end">
		<Input.Search
			placeholder="Search books..."
			style={{ marginBottom: 16, maxWidth: "300px" }}
			allowClear
			onSearch={onSearch}
		/>
		<Table
			style={{ whiteSpace: "nowrap" }}
			dataSource={books}
			columns={columns}
			rowKey="id"
			pagination={false}
			scroll={{ x: "max-content", y: "calc(100vh - 200px)" }}
		/>
	</Flex>
);

export default BooksPage;
