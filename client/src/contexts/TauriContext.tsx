import {
	createContext,
	createEffect,
	createSignal,
	JSXElement,
	useContext,
} from "solid-js";

import * as path from "@tauri-apps/api/path";
import * as os from "@tauri-apps/api/os";
import * as fs from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api";

import { RUNNING_IN_TAURI, APP_NAME } from "@configs";

declare global {
	interface Window {
		__TAURI__?: any;
	}
}

interface DesktopApplicationInfo {
	downloads?: string;
	documents?: string;
	appDocuments?: string;
	os?: string;
	fileSep: "/" | "\\";
}

const _DEFAULT_INFO: DesktopApplicationInfo = {
	downloads: undefined,
	documents: undefined,
	appDocuments: undefined,
	os: undefined,
	fileSep: "/",
} as const;

const TauriContext = createContext(_DEFAULT_INFO);

export const useTauriContext = () => useContext(TauriContext);

export function TauriProvider({ children }: { children: JSXElement }) {
	const [info, setInfo] = createSignal(_DEFAULT_INFO);
	const [loading, setLoading] = createSignal(true);

	createEffect(() => {
		if (RUNNING_IN_TAURI) {
			const callsTauriAPIs = async () => {
				const documents = await path.documentDir();
				const osType = await os.type();
				await fs.createDir(APP_NAME, {
					dir: fs.BaseDirectory.Document,
					recursive: true,
				});
				setInfo({
					downloads: await path.downloadDir(),
					documents: documents,
					appDocuments: `${documents}${APP_NAME}`,
					os: osType,
					fileSep: osType === "Windows_NT" ? "\\" : "/",
				});
				setLoading(false);
				// invoke("show_main_window");
			};

			callsTauriAPIs().catch(console.error);
		}
	});

	return (
		<TauriContext.Provider value={info()}>
			{children}
		</TauriContext.Provider>
	);
}
