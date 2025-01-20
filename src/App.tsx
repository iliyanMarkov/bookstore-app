import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { Layout, Button, Flex, Avatar } from "antd";
import "./App.css";
import {
	ShopOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from "@ant-design/icons";
import NavBar from "./components/NavBar/index.tsx";
import ProfilePage from "./components/pages/ProfilePage/index.tsx";
import BooksPage from "./components/pages/BooksPage/index.tsx";
import ShoppingCart from "./components/ShoppingCart/index.tsx";
import { useUser } from "./redux/user/userSelectors.ts";

const { Content, Sider } = Layout;

const returnInitials = (firstName: string, lastName: string) =>
	firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

const App: React.FC = () => {
	const user = useUser();
	const [cartIsVisible, setCartIsVisible] = useState(true);

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
										{user?.firstName && user?.lastName ? (
											returnInitials(
												user?.firstName,
												user?.lastName
											)
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
							<Route path="/books" element={<BooksPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route
								path="*"
								element={<Navigate to="/books" replace />}
							/>
						</Routes>
					</Content>
					{cartIsVisible && (
						<Sider className="shopping-card-panel">
							<ShoppingCart />
						</Sider>
					)}
				</Layout>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
