export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;


    if (pathname.startsWith("/admin")) {
        if (!token || token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));

        }
    }


    return NextResponse.next();
}
