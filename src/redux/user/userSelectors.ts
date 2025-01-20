import { useSelector } from "react-redux";
import { RootState } from "../store.ts";

export const useUser = () => {
	return useSelector((state: RootState) => state.user);
};
