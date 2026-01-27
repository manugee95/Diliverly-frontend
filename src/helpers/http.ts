// lib/http.ts

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
	data: unknown;

	constructor(status: number, message: string, data?: unknown) {
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

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value));
		}
	});

	const query = searchParams.toString();
	return query ? `${url}?${query}` : url;
}

/**
 * Core request function
 */
async function request<TResponse, TBody = unknown>(
	url: string,
	options: RequestOptions<TBody> = {}
): Promise<TResponse> {
	const baseUrl = getBaseUrl();
	const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

	const res = await fetch(buildUrl(fullUrl, options.params), {
		method: options.method ?? "GET",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		body: options.body ? JSON.stringify(options.body) : undefined,
		cache: options.cache ?? "no-store",
		next: options.next,
	});

	const contentType = res.headers.get("content-type");
	const data = contentType?.includes("application/json")
		? await res.json()
		: await res.text();

	if (!res.ok) {
		throw new HttpError(
			res.status,
			(data as any)?.message ?? res.statusText,
			data
		);
	}

	return data as TResponse;
}

/**
 * Axios-like API
 */
export const http = {
	get: <T>(url: string, options?: RequestOptions) =>
		request<T>(url, { ...options, method: "GET" }),

	post: <T, B>(url: string, body: B, options?: RequestOptions<B>) =>
		request<T, B>(url, {
			...options,
			method: "POST",
			body,
		}),

	put: <T, B>(url: string, body: B, options?: RequestOptions<B>) =>
		request<T, B>(url, {
			...options,
			method: "PUT",
			body,
		}),

	patch: <T, B>(url: string, body: B, options?: RequestOptions<B>) =>
		request<T, B>(url, {
			...options,
			method: "PATCH",
			body,
		}),

	delete: <T>(url: string, options?: RequestOptions) =>
		request<T>(url, { ...options, method: "DELETE" }),
};
