/* @refresh reload */
import { render } from "solid-js/web";

import "./style.css";
import App from "./App";

import { TauriProvider } from "@contexts";

render(
	() => (
		<TauriProvider>
			<App />
		</TauriProvider>
	),
	document.getElementById("root") as HTMLElement
);
