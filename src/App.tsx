import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { Layout, Button, Input, Flex, GetProps, Avatar } from "antd";
import "./App.css";
import apiData from "./mock-data//apiData";
import {
	ShopOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from "@ant-design/icons";
import NavBar from "./components/NavBar/index.tsx";
import ProfilePage from "./components/pages/ProfilePage/index.tsx";
import BooksPage from "./components/pages/BooksPage/index.tsx";
import ShoppingCart from "./components/ShoppingCart/index.tsx";

type SearchProps = GetProps<typeof Input.Search>;

const { Content, Sider } = Layout;

const returnInitials = (firstName: string, lastName: string) =>
	firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

const App: React.FC = () => {
	const [cart, setCart] = useState<
		{
			id: number;
			title: string;
			quantity: number;
			price: number;
			stock: number;
		}[]
	>([]);
	const [search, setSearch] = useState("");
	const [cartIsVisible, setCartIsVisible] = useState(true);
	const [avatarInitials, setAvatarInitials] = useState("");

	const addToCart = (book: (typeof apiData)[0]) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === book.id);
			if (existingItem) {
				return prevCart.map((item) =>
					item.id === book.id && item.quantity < book.stock
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				return [
					...prevCart,
					{
						id: book.id,
						title: book.title,
						quantity: 1,
						price: book.price,
						stock: book.stock,
					},
				];
			}
		});
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	const updateQuantity = (id: number, quantity: number) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id ? { ...item, quantity } : item
			)
		);
	};

	const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
		setSearch(value);
	};

	const filteredBooks = apiData.filter(
		(book) =>
			book.title.toLowerCase().includes(search.toLowerCase()) ||
			book.author.toLowerCase().includes(search.toLowerCase())
	);

	const total = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
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
			render: (price: number, record: any) => `$${price.toFixed(2)}`,
		},
		{
			title: "",
			dataIndex: "price",
			key: "price",
			render: (price: number, record: any) => (
				<Button type="primary" onClick={() => addToCart(record)}>
					Add to Cart
				</Button>
			),
		},
	];

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 769) {
				setCartIsVisible(false);
			} else {
				setCartIsVisible(true);
			}
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<BrowserRouter>
			<Layout style={{ height: "100vh" }}>
				<Flex
					vertical={false}
					align="center"
					justify="space-between"
					style={{ background: "white" }}
				>
					<NavBar
						items={[
							{
								label: (
									<Link
										to="/books"
										onClick={() => {
											if (
												window.innerWidth < 769 &&
												window.location.pathname !==
													"/books"
											) {
												setCartIsVisible(false);
											}
										}}
									>
										Books
									</Link>
								),
								key: "/books",
								icon: <ShopOutlined style={{ fontSize: 16 }} />,
							},
							{
								label: (
									<Link
										to="/profile"
										onClick={() => {
											if (window.innerWidth < 769) {
												setCartIsVisible(false);
											}
										}}
									>
										Profile
									</Link>
								),
								key: "/profile",
								icon: (
									<Avatar
										size={20}
										style={{
											backgroundColor: "inherit",
											color: "inherit",
											borderWidth: "1px",
											borderStyle: "solid",
											borderColor: "inherit",
										}}
									>
										{avatarInitials ? (
											avatarInitials
										) : (
											<UserOutlined />
										)}
									</Avatar>
								),
							},
						]}
					/>
					<Button
						type="primary"
						onClick={() => {
							setCartIsVisible(!cartIsVisible);
						}}
						className="cart-button"
					>
						<ShoppingCartOutlined style={{ fontSize: "18px" }} />
					</Button>
				</Flex>

				<Layout style={{ height: "100%", position: "relative" }}>
					<Content style={{ padding: "24px", height: "100%" }}>
						<Routes>
							<Route
								path="/books"
								element={
									<BooksPage
										books={filteredBooks}
										search={search}
										onSearch={onSearch}
										columns={columns}
									/>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProfilePage
										onSubmit={(values) => {
											setAvatarInitials(
												returnInitials(
													values?.firstName,
													values?.lastName
												)
											);
										}}
									/>
								}
							/>
							<Route
								path="*"
								element={<Navigate to="/books" replace />}
							/>
						</Routes>
					</Content>
					{cartIsVisible && (
						<Sider className="shopping-card-panel">
							<ShoppingCart
								cart={cart}
								total={total}
								removeFromCart={removeFromCart}
								updateQuantity={updateQuantity}
							/>
						</Sider>
					)}
				</Layout>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
