import React from "react";
import { Button, Typography, InputNumber, Flex, Divider } from "antd";
import { useShoppingCart } from "../../redux/shoppingCart/shoppingCartSelectors.ts";
import {
	purchaseShoppingCartItems,
	removeBookFromShoppingCart,
	updateBookShoppingCartQuantity,
} from "../../redux/shoppingCart/shoppingCartActions.ts";
import { updateCurrentBook } from "../../redux/bookStore/bookStoreActions.ts";
import { excludeKey } from "../../commonFunctions/exclusion.ts";
import { Book } from "../../redux/bookStore/bookStoreTypes.ts";
import { useUser } from "../../redux/user/userSelectors.ts";
import { useBookStore } from "../../redux/bookStore/bookStoreSelectors.ts";
const { Title } = Typography;

const ShoppingCart: React.FC = () => {
	const user = useUser();
	const shoppingCart = useShoppingCart();
	const bookStore = useBookStore();

	return (
		<Flex
			vertical={true}
			gap={"large"}
			style={{
				padding: "24px",
			}}
		>
			<Flex vertical={true} gap={"small"}>
				<Title level={4} style={{ margin: "0" }}>
					Shopping Cart
				</Title>
				<Divider style={{ margin: "10px 0" }} />
			</Flex>

			<Flex
				vertical={true}
				gap={"middle"}
				style={{
					height: "calc(100vh - 300px)",
					overflow: "auto",
				}}
			>
				{shoppingCart.items.length === 0 ? (
					<Title level={5} style={{ margin: "0" }}>
						Your cart is empty
					</Title>
				) : (
					shoppingCart.items.map((item, index) => (
						<Flex key={index} vertical={true} gap={"small"}>
							{index !== 0 && (
								<Divider style={{ margin: "10px 0" }} />
							)}
							<Title level={5} style={{ margin: "0" }}>
								{item.title}
							</Title>

							<Flex gap={"small"}>
								<InputNumber
									min={1}
									max={item.stock}
									value={item.quantity}
									onChange={(value) => {
										const currentValue = value as number;
										updateBookShoppingCartQuantity({
											...item,
											quantity: currentValue,
										});
										if (value === 0) {
											removeBookFromShoppingCart(item);
										}
										updateCurrentBook({
											...excludeKey(item, "quantity"),
											stock: item.stock - currentValue,
										} as Book);
									}}
								/>
								<Button
									onClick={() => {
										removeBookFromShoppingCart(item);
										updateCurrentBook({
											...excludeKey(item, "quantity"),
											stock: item.stock,
										} as Book);
									}}
								>
									Remove
								</Button>
							</Flex>
						</Flex>
					))
				)}
			</Flex>
			<Flex vertical={true} gap={"small"}>
				<Divider style={{ margin: "10px 0" }} />
				<Title level={5} style={{ margin: "0" }}>
					Total: ${shoppingCart.total.toFixed(2)}
				</Title>
				<Button
					disabled={!shoppingCart.items.length}
					type="primary"
					onClick={() => {
						purchaseShoppingCartItems({
							shoppingCart,
							bookStore,
							user,
						});
					}}
				>
					Submit
				</Button>
			</Flex>
		</Flex>
	);
};

export default ShoppingCart;
