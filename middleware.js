import { NextResponse } from "next/server";

export function middleware(req) {
  //   return  Response.json();

  return NextResponse.next();
}

//apply filter to show which request
export const config = {
  matcher: "/news",
};
