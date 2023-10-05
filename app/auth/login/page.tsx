'use client'

import { useRef } from 'react';
import { signIn } from 'next-auth/react';

function LoginPage() {
    const email = useRef("p@x.l");
    const pass = useRef("123");

    // console.log(email);

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: true,
            callbackUrl: '/'
        })
    }
    return (
        <div
            className='flex justify-center items-center h-screen bg-gradient-to-br from-cyan-300 to-sky-600'
        >
            <div
                className='px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2'
            >
                <label htmlFor="email">Email:  &nbsp;
                    <input
                        className='w-full p-2 border rounded-md'
                        onChange={(e) => (email.current = e.target.value)}
                        value={'p@x.l'}
                    />
                </label>
                <label htmlFor="pass">Password:  &nbsp;
                    <input
                        className='w-full p-2 border rounded-md'
                        onChange={(e) => (pass.current = e.target.value)}
                        type='password'
                        
                    />
                </label>
                <button
                    className='bg-gradient-to-br from-cyan-300 to-sky-600 border rounded-md'
                    onClick={onSubmit}>
                    login
                </button>
            </div>
        </div>
    )
}

export default LoginPage