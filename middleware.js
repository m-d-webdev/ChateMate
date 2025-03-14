import { NextResponse } from "next/server";

export async function middleware(req) {
  const tokenRes = await req.cookies.get("token");
  const token = tokenRes.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/Chats/:path*", "/Meetmates", "/changeName", "/changePic", "/changeStatus"],
};