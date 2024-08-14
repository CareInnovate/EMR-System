import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const isLoggedIn = request.cookies.get("next-auth.session-token");
	if (isLoggedIn) {
		return NextResponse.next();
	}
	const url = new URL("/signin", "http://localhost:3000");
	url.searchParams.append("callbackUrl", request.url);
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ["/dashboard", "/appointments", "/profile", "/payment"],
};
