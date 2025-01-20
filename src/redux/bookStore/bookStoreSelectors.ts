import { useSelector } from "react-redux";
import { RootState } from "../store.ts";

export const useBookStore = () => {
	return useSelector((state: RootState) => state.bookStore);
};
