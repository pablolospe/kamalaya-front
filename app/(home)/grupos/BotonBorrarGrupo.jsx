'use client'

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { URL } from '@/config';

function BotonBorrarGrupo({ id }) {
  const router = useRouter();

  const handleDeleteConfirmation = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás segur@?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Borrar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/grupo/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

            Swal.fire(
              'Borrada',
              'El grupo ha sido eliminado',
              'success'
            ).then(() => router.refresh());
          
        } catch (error) {
          console.error('Error al intentar borrar el grupo:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al intentar borrar el grupo',
            'error'
          );
        }
      }
    });
  };

  return (
    <div>
      <button onClick={(e) => handleDeleteConfirmation(e)}>
        ❌
      </button>
    </div>
  );
}

export default BotonBorrarGrupo;
