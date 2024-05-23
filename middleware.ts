// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const token = await getToken({
//     req: req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   console.log("Path:", path);
//   console.log("Token:", token);
//   const publicPaths = path === "/login" || path === "/register";

//   if (publicPaths && token) {
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }
//   if (!publicPaths && !token) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }
// }

// export const config = {
//   matcher: ["/", "/register", "/login"],
// };
