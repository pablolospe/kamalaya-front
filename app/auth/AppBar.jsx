'use client';

import { useSession, signOut, signIn } from 'next-auth/react';

import React from 'react';

function AppBar() {
  const { data: session } = useSession();
  console.log(session);
  
  return (
    <div className="ml-auto dlex gap-2">
      {session?.user ? (
        <div className='flex flex-row align-middle content-center items-center gap-2 mt-1 mr-6'>
          <p className='hidden sm:block'>Email: {session?.user.email} </p>
          <button className="text-xs sm:text-sm text-red-600 border rounded-md p-1" onClick={() => signOut({callbackUrl:'/auth/login'})}>
            Sign out
          </button>
        </div>
      ) : (
        null
        // <button className="text-red-600" onClick={() => signIn()}>
        //   Sign in
        // </button>
      )}
    </div>
  );
}


export default AppBar;
