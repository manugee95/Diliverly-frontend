import { getCookie, setCookie } from "./cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type RequestOptions<TBody = unknown> = {
	method?: HttpMethod;
	body?: TBody;
	headers?: HeadersInit;
	params?: QueryParams;
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
};

/**
 * Axios-like error object
 */
export class HttpError extends Error {
	status: number;
	data: any;

	constructor(status: number, message: string, data?: any) {
		super(message);
		this.status = status;
		this.data = data;
	}
}

/**
 * Base URL resolver (SSR + Client safe)
 */
function getBaseUrl() {
	if (typeof window === "undefined") {
		return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
	}

	return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

/**
 * Query string builder
 */
function buildUrl(url: string, params?: QueryParams) {
	if (!params) return url;

	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value != null) {
			searchParams.append(key, String(value));
		}
	}

	const query = searchParams.toString();
	return query ? `${url}?${query}` : url;
}

/**
 * Runtime check
 */
function isBrowser() {
	return typeof window !== "undefined" && typeof document !== "undefined";
}

async function refreshTokens(): Promise<boolean> {
	try {
		const refreshToken = getCookie("refreshToken");
		if (!refreshToken) return false;

		const baseUrl = getBaseUrl();

		const res = await fetch(`${baseUrl}/auth/refresh-tokens`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});

		if (!res.ok) return false;

		const data = await res.json();

		// IMPORTANT: use your existing helper
		setCookie("accessToken", data.accessToken, {
			hours: 2,
			sameSite: "Lax",
		});

		setCookie("refreshToken", data.refreshToken, {
			days: 7,
			sameSite: "Lax",
		});

		return true;
	} catch {
		return false;
	}
}

/**
 * Core request function
 */
async function request<TResponse, TBody = unknown>(
	url: string,
	options: RequestOptions<TBody> = {},
	retry = true
): Promise<TResponse> {
	const baseUrl = getBaseUrl();
	const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

	const headers = new Headers(options.headers);
	headers.set("Content-Type", "application/json");

	if (isBrowser()) {
		const token = getCookie("accessToken");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
	}

	const res = await fetch(buildUrl(fullUrl, options.params), {
		method: options.method ?? "GET",
		headers,
		body: options.body ? JSON.stringify(options.body) : undefined,
		cache: options.cache ?? "no-store",
		next: options.next,
	});

	// ✅ SUCCESS
	if (res.ok) {
		const contentType = res.headers.get("content-type");
		return (
			contentType?.includes("application/json")
				? await res.json()
				: await res.text()
		) as TResponse;
	}

	// 🔁 401 handling (browser only, one retry)
	if (
		res.status === 401 &&
		retry &&
		isBrowser() &&
		!url.includes("/auth/refresh-tokens")
	) {
		const refreshed = await refreshTokens();

		if (refreshed) {
			// retry original request once
			return request<TResponse, TBody>(url, options, false);
		}
	}

	// FAILURE
	const contentType = res.headers.get("content-type");
	const data = contentType?.includes("application/json")
		? await res.json()
		: await res.text();

	throw new HttpError(
		res.status,
		(data as any)?.message ?? res.statusText,
		data
	);
}

/**
 * Axios-like API
 */
export const http = {
	get: <T>(url: string, options?: RequestOptions) =>
		request<T>(url, { ...options, method: "GET" }),

	post: <T, B>(url: string, body: B, options?: RequestOptions<B>) =>
		request<T, B>(url, { ...options, method: "POST", body }),

	put: <T, B>(url: string, body: B, options?: RequestOptions<B>) =>
		request<T, B>(url, { ...options, method: "PUT", body }),

	patch: <T, B>(url: string, body: B, options?: RequestOptions<B>) =>
		request<T, B>(url, { ...options, method: "PATCH", body }),

	delete: <T>(url: string, options?: RequestOptions) =>
		request<T>(url, { ...options, method: "DELETE" }),
};
