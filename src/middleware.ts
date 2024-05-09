
// This function can be marked `async` if using `await` inside
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const token = req.cookies.get('token')?.value || ''
    // console.log("session",token)
    if (!token && path !== "/login" && path !== "/register" && path !== "/") {
        return NextResponse.redirect(new URL('/login', req.url))
    } else if (token && (path === '/login' || path === '/register')) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}    // See "Matching Paths" below to learn more
    export const config = {
        matcher: ['/', '/login', '/register', '/profile'],
    }
