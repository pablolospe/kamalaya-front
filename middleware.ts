import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req){
    if(req.nextUrl.pathname.startsWith("/usuarios") && req.nextauth.token?.role !== "Admin")
    return NextResponse.rewrite(new URL("/auth/login?message=Not authorized!", req.url))

    // if(req.nextUrl.pathname.startsWith("/ingreso/voluntario") && req.nextauth.token?.role !== "Admin")
    // return NextResponse.rewrite(new URL("/auth/login?message=Not authorized!", req.url))
  
    // if(req.nextauth.token?.role !== "User")
    // return NextResponse.rewrite(new URL("/auth/login?message=Not authorized!", req.url))
  },
  {
    callbacks:{
      authorized:({token})=> !!token,
    }
  }
  )
  
  
  export const config = {
  //   matcher: [ '/voluntarios/:path*', '/pacientes/:path*', '/ingreso', '/ingreso/paciente'],
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
