import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const AUTH_SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const session = await getToken({
        req,
        secret: AUTH_SECRET,
    });

    const signinUrl = new URL("/auth/login", req.url);
    if (!session) {
        return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|auth/login|images).*)",
        // '/mitra/:path*'
    ],
};
