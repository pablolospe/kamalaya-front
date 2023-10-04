'use client';

import { useSession, signOut, signIn } from 'next-auth/react';

import React from 'react';

function AppBar() {
  const { data: session } = useSession();

  return (
    <div className="ml-auto dlex gap-2">
      {session?.user ? (
        <>
          <p>Usuario: {session?.user.email} </p>
          <button className="text-red-600" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <button className="text-red-600" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default AppBar;
