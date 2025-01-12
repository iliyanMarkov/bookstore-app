import React from "react";
import { Button, Input, Typography, Form, DatePicker, message } from "antd";

const { Title } = Typography;

const ProfilePage: React.FC<{
	onSubmit: Function;
}> = ({ onSubmit }) => {
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		message.success("Profile updated successfully!");
		onSubmit(values);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={handleSubmit}
			style={{ maxWidth: 600, margin: "0 auto" }}
		>
			<Title level={4}>Profile</Title>
			<Form.Item
				label="First Name"
				name="firstName"
				rules={[
					{
						required: true,
						message: "Please input your first name!",
					},
				]}
			>
				<Input placeholder="First Name" />
			</Form.Item>
			<Form.Item
				label="Last Name"
				name="lastName"
				rules={[
					{ required: true, message: "Please input your last name!" },
				]}
			>
				<Input placeholder="Last Name" />
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{ type: "email", message: "Please enter a valid email!" },
				]}
			>
				<Input placeholder="Email" />
			</Form.Item>
			<Form.Item label="Date of Birth" name="dob">
				<DatePicker style={{ width: "100%" }} />
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Save Profile
			</Button>
		</Form>
	);
};

export default ProfilePage;
