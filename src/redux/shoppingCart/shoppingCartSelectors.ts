import { useSelector } from "react-redux";
import { RootState } from "../store.ts";

export const useShoppingCart = () =>
	useSelector((state: RootState) => state.shoppingCart);
