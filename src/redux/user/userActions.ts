import { message } from "antd";
import store from "../store.ts";
import { setUser } from "./userSlice.ts";
import { User } from "./userTypes.ts";

export const fetchUser = async () => {
	try {
		const response = await fetch("http://localhost:5000/user");
		const data: User = await response.json();
		store.dispatch(setUser(data));
	} catch (error) {
		console.error("Error fetching user:", error);
	}
};

export const postUser = async (values: any) => {
	const user: User = {
		firstName: values.firstName,
		lastName: values.lastName,
		email: values.email,
		dateOfBirth: values.dateOfBirth,
	};

	store.dispatch(setUser(user));

	try {
		await fetch("http://localhost:5000/user", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		message.success("Profile updated successfully!");
	} catch (error) {
		console.error("Error updating user profile:", error);
		message.error("Failed to update profile. Please try again.");
	}
};
