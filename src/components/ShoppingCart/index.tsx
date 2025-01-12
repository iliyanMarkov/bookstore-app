import React from "react";
import { Button, Typography, InputNumber, message, Flex, Divider } from "antd";
const { Title } = Typography;

const ShoppingCart: React.FC<{
	cart: {
		id: number;
		title: string;
		quantity: number;
		price: number;
		stock: number;
	}[];
	total: number;
	removeFromCart: any;
	updateQuantity: any;
}> = ({ cart, total, removeFromCart, updateQuantity }) => (
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
			{cart.length === 0 ? (
				<Title level={5} style={{ margin: "0" }}>
					Your cart is empty
				</Title>
			) : (
				cart.map((item, index) => (
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
								onChange={(value) =>
									updateQuantity(item.id, Number(value))
								}
							/>
							<Button onClick={() => removeFromCart(item.id)}>
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
				Total: ${total.toFixed(2)}
			</Title>
			<Button
				type="primary"
				onClick={() => message.success("Order Submitted!")}
			>
				Submit
			</Button>
		</Flex>
	</Flex>
);

export default ShoppingCart;
