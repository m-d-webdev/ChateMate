import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get token from cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
  }

  return NextResponse.next(); 
}


export const config = {
    matcher: ["/Chats/:path*",  "/Meetmates", "/changeName", "/changePic", "/changeStatus"],
};