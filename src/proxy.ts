import { NextResponse, NextRequest } from "next/server";
import { http } from "./helpers/http";
import { User } from "./types";

const AUTH_PAGES = new Set([
	"/",
	"/auth/signin",
	"/auth/signup",
	"/auth/verify-otp",
]);

function isAuthPage(pathname: string) {
	return AUTH_PAGES.has(pathname);
}

function isVendorRoute(pathname: string) {
	return pathname.startsWith("/vendor");
}

function isAgentRoute(pathname: string) {
	return pathname.startsWith("/agent");
}

function redirectWithCookies(
	request: NextRequest,
	responseWithCookies: NextResponse,
	location: string
) {
	const redirect = NextResponse.redirect(new URL(location, request.url));

	responseWithCookies.cookies.getAll().forEach((cookie) => {
		redirect.cookies.set(cookie);
	});

	return redirect;
}

export async function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	const accessToken = request.cookies.get("accessToken")?.value;
	const refreshToken = request.cookies.get("refreshToken")?.value;

	if (pathname.includes(".")) {
		return NextResponse.next();
	}

	const nextUrl = pathname + search;

	// Base response (we will reuse this)
	let response = NextResponse.next();

	//No access token
	if (!accessToken) {
		if (!isAuthPage(pathname)) {
			const redirect = NextResponse.redirect(
				new URL(`/auth/signin?next=${encodeURIComponent(nextUrl)}`, request.url)
			);
			return redirect;
		}
		return response;
	}

	let user: User;

	try {
		//  Try current access token
		user = await http.get<User>("/users/me", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
	} catch (error: any) {
		// Only refresh on 401
		if (error.status !== 401 || !refreshToken) {
			return redirectToSignin(request, pathname, nextUrl);
		}

		//console.log(error.status, refreshToken);

		try {
			// Refresh tokens
			const refreshed = await http.post<
				{
					accessToken: string;
					refreshToken: string;
				},
				{ refreshToken: string }
			>(
				"/auth/refresh-tokens",
				{ refreshToken },
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);

			console.log("refreshed", refreshed);

			// Attach refreshed cookies to BASE response
			const isSecure = request.nextUrl.protocol === "https:";

			response.cookies.set("accessToken", refreshed.accessToken, {
				path: "/",
				maxAge: 2 * 60 * 60, // 1 hour
				sameSite: "lax",
				secure: isSecure,
			});

			response.cookies.set("refreshToken", refreshed.refreshToken, {
				path: "/",
				maxAge: 60 * 60 * 24 * 7, // 7 days
				sameSite: "lax",
				secure: isSecure,
			});

			// Retry user fetch
			user = await http.get<User>("/users/me", {
				headers: {
					Authorization: `Bearer ${refreshed.accessToken}`,
				},
			});
		} catch (err: any) {
			console.log(err);
			return redirectToSignin(request, pathname, nextUrl);
		}
	}

	//  AUTHENTICATED LOGIC BELOW (response may already have cookies)

	// Block auth pages
	if (isAuthPage(pathname)) {
		if (user.isVendor) {
			return redirectWithCookies(request, response, "/vendor");
		}

		if (user.isAgent) {
			return redirectWithCookies(request, response, "/agent");
		}
	}

	// Strict role enforcement
	if (isVendorRoute(pathname) && !user.isVendor) {
		return redirectWithCookies(request, response, "/agent");
	}

	if (isAgentRoute(pathname) && !user.isAgent) {
		return redirectWithCookies(request, response, "/vendor");
	}

	return response;
}

function redirectToSignin(
	request: NextRequest,
	pathname: string,
	nextUrl: string
) {
	if (AUTH_PAGES.has(pathname)) {
		return NextResponse.next();
	}

	return NextResponse.redirect(
		new URL(`/auth/signin?next=${encodeURIComponent(nextUrl)}`, request.url)
	);
}

export const config = {
	matcher: ["/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"],
};
