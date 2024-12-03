import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./lib/session";

const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/register"];

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getServerSession();

  if (isProtectedRoute && !session?.token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;
