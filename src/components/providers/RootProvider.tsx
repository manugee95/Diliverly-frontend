"use client";
import { createContext, useContext, useRef, PropsWithChildren } from "react";
import { createStore, StoreApi } from "zustand/vanilla";
import { useStore } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface Alert {
	show?: boolean;
	message: string;
	type: "error" | "success" | "warning";
}

interface RootStore {
	alert: Alert;
	setAlert(alert: Alert): void;
	userDetails: any;
	setUserDetails: (val: any) => void;
}

const RootContext = createContext<StoreApi<RootStore> | null>(null);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const createRootStore = (defaultUser: any, apiKey: string | null) =>
	createStore<RootStore>()((set) => ({
		alert: {
			show: false,
			message: "A initial message",
			type: "success",
		},
		setAlert: (val) => set((state) => ({ ...state, alert: val })),
		userDetails: defaultUser,
		setUserDetails: (val) => set((state) => ({ ...state, userDetails: val })),
	}));

const RootProvider = ({
	children,
	defaultUser = null,
	apiKey = null,
}: PropsWithChildren & {
	defaultUser?: any;
	apiKey?: string | null;
}) => {
	const rootStoreRef = useRef<StoreApi<RootStore>>(null);

	if (!rootStoreRef.current) {
		rootStoreRef.current = createRootStore(defaultUser, apiKey);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<RootContext.Provider value={rootStoreRef.current}>
				{children}
			</RootContext.Provider>
		</QueryClientProvider>
	);
};

export const useRootStore = () => {
	const ctxStore = useContext(RootContext);

	if (!ctxStore) {
		throw new Error("Root provider not found");
	}

	return useStore(ctxStore, (state) => state);
};

export default RootProvider;
