'use client'

import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

function LoginPage() {
    // Utiliza useState para manejar el estado del email y la contraseña
    const [email, setEmail] = useState('pablolospennato@gmail.com');
    const [pass, setPass] = useState('123');

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Usa el valor actual de los estados email y pass en la llamada a signIn
        const result = await signIn("credentials", {
            email: email,
            password: pass,
            redirect: true,
            callbackUrl: '/'
        });
    }

    return (
        <form
            className='flex justify-center items-center h-screen bg-gradient-to-br from-blue-300 to-sky-600'
            // className='flex justify-center items-center h-screen bg-gradient-to-br from-purple-300 to-green-300'
        >
            <div
                className='px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2'
                >
                <br />
                <h1 className='text-blue-700'>SlowLife: </h1>
                <h2 className='text-red-600'>Aguarde unos instantes para que la app inicie...</h2>
                <br />
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
                        placeholder='123'
                    />
                </label>
                <button
                    type='submit'
                    className='bg-gradient-to-br from-cyan-300 to-sky-600 border rounded-md p-2 mt-2 hover:bg-gradient-to-br hover:to-cyan-300 hover:from-sky-600 '
                    onClick={onSubmit}
                >
                    Ingresar
                </button>
            </div>
        </form>
    )
}

export default LoginPage;
