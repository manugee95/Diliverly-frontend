export type SameSite = "Lax" | "Strict" | "None";

export interface SetCookieOptions {
	days?: number;
	hours?: number;
	path?: string;
	sameSite?: "Lax" | "Strict" | "None";
	secure?: boolean;
}

export function setCookie(
	name: string,
	value: string,
	{
		days,
		hours,
		path = "/",
		sameSite = "Lax",
		secure = window.location.protocol === "https:",
	}: SetCookieOptions = {}
): void {
	let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

	if (days !== undefined || hours !== undefined) {
		const ms =
			(days ?? 0) * 24 * 60 * 60 * 1000 + (hours ?? 0) * 60 * 60 * 1000;

		const expires = new Date(Date.now() + ms).toUTCString();
		cookie += `; Expires=${expires}`;
	}

	cookie += `; Path=${path}`;
	cookie += `; SameSite=${sameSite}`;

	if (secure) {
		cookie += `; Secure`;
	}

	document.cookie = cookie;
}

export function getCookie(name: string): string | null {
	const encodedName = encodeURIComponent(name) + "=";

	const found = document.cookie
		.split("; ")
		.find((cookie) => cookie.startsWith(encodedName));

	return found ? decodeURIComponent(found.slice(encodedName.length)) : null;
}

export function clearCookie(name: string, path: string = "/"): void {
	document.cookie =
		`${encodeURIComponent(name)}=; ` +
		`Path=${path}; ` +
		`Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
