import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const authRoutes = ["/signin"];

    if (authRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
      return NextResponse.redirect(new URL("/nueva-inversion", req.url));
    }

    if (!authRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/signin", "/nueva-inversion", "/nueva-inversion/resumen"],
};
