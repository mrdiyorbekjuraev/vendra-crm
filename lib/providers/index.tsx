"use client";
import GlobalModals from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/config/theme";
import type { TLocale } from "@/types/shared";
import { getQueryClient } from "@/utils/get-query-clients";
import { refresh } from "@/utils/refresh";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type FC, useEffect, useMemo, useState } from "react";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import { v4 as uuidv4 } from "uuid";
import { ReactScan } from "../react-scan";

type Props = {
	children: React.ReactNode;
	lang: TLocale;
	messages: AbstractIntlMessages;
};

const Providers: FC<Props> = ({ children, lang, messages }) => {
	const queryClient = getQueryClient();
	const [store, setStore] = useState<any | null>(null);

	useEffect(() => {
		if (!sessionStorage.getItem("browser_uuid")) {
			sessionStorage.setItem("browser_uuid", uuidv4());
		}
		const clientStore = createStore({
			authName: "_vendra_auth",
			authType: "cookie",
			cookieDomain: window.location.hostname,
			cookieSecure: window.location.protocol === "https:",
			refresh,
		});
		setStore(clientStore);
	}, []);

	if (!store) return null;

	const timeZone =
		Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tashkent";

	return (
		<AuthProvider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<NextIntlClientProvider
						locale={lang}
						messages={messages}
						timeZone={timeZone}
					>
						{process.env.NODE_ENV === "development" && <ReactScan />}

						<Toaster position="top-right" />
						{process.env.NODE_ENV !== "production" && (
							<ReactQueryDevtools initialIsOpen={false} />
						)}
						<NuqsAdapter>
							{children}
							{<GlobalModals />}
						</NuqsAdapter>
					</NextIntlClientProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default Providers;
