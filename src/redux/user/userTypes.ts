import { Dayjs } from "dayjs";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	dateOfBirth: string | null;
}

export interface UserState extends User {}
