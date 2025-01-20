import React from "react";
import { Button, Input, Typography, Form, DatePicker } from "antd";
import { postUser } from "../../../redux/user/userActions.ts";
import { useUser } from "../../../redux/user/userSelectors.ts";
import dayjs from "dayjs";

const { Title } = Typography;

const ProfilePage: React.FC = () => {
	const user = useUser();
	const [form] = Form.useForm();

	const parsedDateOfBirth = user.dateOfBirth
		? dayjs(user.dateOfBirth).isValid()
			? dayjs(user.dateOfBirth)
			: null
		: null;

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={(values) => {
				postUser({
					...values,
					dateOfBirth: values.dateOfBirth
						? values.dateOfBirth.format("YYYY-MM-DD")
						: null,
				});
			}}
			style={{ maxWidth: 600, margin: "0 auto" }}
			initialValues={{
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				dateOfBirth: parsedDateOfBirth,
			}}
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
			<Form.Item label="Date of Birth" name="dateOfBirth">
				<DatePicker style={{ width: "100%" }} />
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Save Profile
			</Button>
		</Form>
	);
};

export default ProfilePage;
