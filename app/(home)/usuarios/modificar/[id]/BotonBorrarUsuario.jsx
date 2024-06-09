'use client'

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { URL } from '@/config';

function BotonBorrarUsuario({ id, nombre, apellido }) {
    const router = useRouter();

    const handleDeleteConfirmation = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: `¿Estás segur@ de borrar a ${nombre} ${apellido}?`,
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '¡Borrar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Está a punto de borrar al usuario ${nombre} ${apellido}`,
                    text: 'Confirme que desea continuar',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                }).then(async (secondResult) => {
                    if (secondResult.isConfirmed) {
                        try {
                            const response = await fetch(`${URL}/users/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            if (response.ok) {
                                Swal.fire(
                                    'Borrado',
                                    'El usuario ha sido eliminado',
                                    'success'
                                ).then(() => router.push('/usuarios'));
                            } else {
                                Swal.fire(
                                    'Error',
                                    'Hubo un problema al intentar borrar el usuario',
                                    'error'
                                );
                            }
                        } catch (error) {
                            console.error('Error al intentar borrar el usuario:', error);
                            Swal.fire(
                                'Error',
                                'Hubo un problema al intentar borrar el usuario',
                                'error'
                            );
                        }
                    }
                });
            }
        });
    };

    return (
        <div>
            <button
                className="w-40 mt-4 py-2 px-4 text-center ring-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={(e) => handleDeleteConfirmation(e)}>
                Borrar usuario
            </button>
        </div>
    );
}

export default BotonBorrarUsuario;
