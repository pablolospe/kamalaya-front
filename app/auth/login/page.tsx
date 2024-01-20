'use client'

// Importa useRef y useState desde 'react'
import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

function LoginPage() {
    // Utiliza useState para manejar el estado del email y la contraseña
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const onSubmit = async () => {
        // Usa el valor actual de los estados email y pass en la llamada a signIn
        const result = await signIn("credentials", {
            email: email,
            password: pass,
            redirect: true,
            callbackUrl: '/'
        });
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
                        // Utiliza setEmail para actualizar el estado del email
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}  // Corrige el valor de la propiedad value
                        placeholder='pablolospennato@gmail.com'
                    />
                </label>
                <label htmlFor="pass">Password:  &nbsp;
                    <input
                        className='w-full p-2 border rounded-md'
                        // Utiliza setPass para actualizar el estado de la contraseña
                        onChange={(e) => setPass(e.target.value)}
                        type='password'
                    />
                </label>
                <button
                    className='bg-gradient-to-br from-cyan-300 to-sky-600 border rounded-md p-4'
                    onClick={onSubmit}
                >
                    login
                </button>
            </div>
        </div>
    )
}

export default LoginPage;
