import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // const isLoggedIn =
  //   Boolean(req.cookies.get("better-auth.session_token")) ||
  //   Boolean(req.cookies.get("__Secure-better-auth.session_token"));

  // const protectedRoutes = ["/dashboard", "/project", "/settings"];

  // const isProtected = protectedRoutes.some((route) =>
  //   req.nextUrl.pathname.startsWith(route),
  // );

  // if (isProtected && !isLoggedIn) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }

  return NextResponse.next();
}
export const runtime = "nodejs"; 

export const config = {
  matcher: ["/project/:path*", "/dashboard", "/settings", "/profile"],
};
