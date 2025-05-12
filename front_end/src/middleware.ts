import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value

  // Danh sách route được bảo vệ (yêu cầu token)
  const protectedRoutes = ["/cart", "/checkout", "/member"]

  // Danh sách route auth (login/register)
  const authRoutes = ["/login", "/register"]

  // Nếu không có token VÀ đang truy cập route được bảo vệ → Redirect đến /login
  if (
    !accessToken &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  // Nếu có token VÀ đang truy cập route auth → Redirect về trang chủ
  if (accessToken && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  // Tiếp tục cho phép truy cập nếu đã có accessToken
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/cart", "/checkout/:path*", "/member", "/login", "/register"]
}
