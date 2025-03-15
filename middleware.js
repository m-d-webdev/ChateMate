import { NextResponse } from "next/server";

export async function middleware(req) {
  const tokenRes = await req.cookies.get("token");

  if (!tokenRes) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const token = tokenRes.value

  return NextResponse.next();
}


export const config = {
  matcher: ["/Chats/:path*", "/Meetmates", "/changeName", "/changePic", "/changeStatus"],
};