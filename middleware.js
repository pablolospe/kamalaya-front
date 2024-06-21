import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const protectedRoutes = ['/usuarios', 'grupos', '/ingreso/voluntario'];
    const token = req?.nextauth?.token?.token
    // console.log(token);

    const allowedRoles = ['User', 'Admin'];
    
    if (
      protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
      !allowedRoles.includes(req.nextauth.token?.role)
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

// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
//   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!session) {
//     const requestedPage = req.nextUrl.pathname;
//     const url = req.nextUrl.clone();
//     url.pathname = `/auth/login`;
//     url.search = `p=${requestedPage}`;

//     return NextResponse.redirect(url);
//   }
//   //   return NextResponse.redirect(new URL('/home', req.url));
//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
// //   matcher: [ '/voluntarios/:path*', '/pacientes/:path*', '/ingreso', '/ingreso/paciente'],
//   matcher: ['/mapa', '/pacientes/:path*'],
// };
