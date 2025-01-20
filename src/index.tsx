import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { fetchBooks } from "./redux/bookStore/bookStoreActions.ts";
import { fetchUser } from "./redux/user/userActions.ts";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const initializeApp = async () => {
	root.render(<div>Loading...</div>);

	await fetchBooks();
	await fetchUser();

	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
};

initializeApp();
