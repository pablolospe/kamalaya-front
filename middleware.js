import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const protectedRoutes = ['/usuarios', '/grupos/:id', '/ingreso/voluntario', '/voluntarios/:id',];
    const role = req?.nextauth?.token?.role

    const allowedRoles = ['User', 'Admin'];
    
    if (
      protectedRoutes.some((route) => {
        const regex = new RegExp(route.replace(':id', '[^/]+'));
        return req.nextUrl.pathname.match(regex);
      }) && role !== 'Admin'
    ) {
      return NextResponse.rewrite(new URL("/auth/login?message=Not authorized!", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/mapa', '/pacientes/:path*', '/voluntarios/:path*', '/usuarios/:path*', '/ingreso/:path*', '/grupos/:path*'],
};
