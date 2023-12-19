'use client';

import { useSession, signOut, signIn } from 'next-auth/react';

import React from 'react';

function AppBar() {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div className="ml-auto dlex gap-2 ">
      <div className="flex flex-row align-middle content-center items-center gap-2 mt-1 mr-6 bg-gray-100 px-2 py-1 rounded">
        <p className="hidden sm:block">{session?.user.nombre} </p>
        <button
          className="text-xs sm:text-sm text-red-600 border rounded-md p-1 bg-gray-100 hover:bg-gray-200"
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default AppBar;

// {session?.user ? (
//   <div className='flex flex-row align-middle content-center items-center gap-2 mt-1 mr-6'>
//     <p className='hidden sm:block'>Email: {session?.user.email} </p>
//     <button className="text-xs sm:text-sm text-red-600 border rounded-md p-1" onClick={() => signOut({callbackUrl:'/auth/login'})}>
//       Sign out
//     </button>
//   </div>
// ) : (
//   null
// <button className="text-red-600" onClick={() => signIn()}>
//   Sign in
// </button>
// )}
