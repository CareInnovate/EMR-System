import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const isLoggedIn = request.cookies.get("__Secure-next-auth.session-token");
	if (isLoggedIn) {
		return NextResponse.next();
	}
	const base = `https://${process.env.VERCEL_URL}`;
	const redirect = new URLSearchParams({
		callbackUrl: `https://${base}/dashboard`,
	});
	return NextResponse.redirect(`${base}/signin?${redirect.toString()}`);
}

export const config = {
	matcher: {
		source: "/((?!api|_next/static|_next/image|favicon.ico|signin).*)",
	},
};
