'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { LuX } from 'react-icons/lu';
import { URL } from '@/config';

function BotonBorrarAntecedentePatologico(id) {
  const router = useRouter();

  const borrarPatologiaHandler = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás segur@?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Borrar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const response = fetch(
          `${URL}/patologias/${id.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        Swal.fire('Borrada', 'La patologia ha sido eliminada', 'success').then(
          router.refresh()
        );
      }
    });
  };

  return (
    <div className="flex align-middle justify-center text-lg font-bolder bg-red-400 hover:bg-red-500 cursor-pointer p-1 rounded-lg ">
      <button onClick={(e) => borrarPatologiaHandler(e)}>
        <LuX />
      </button>
    </div>
  );
}

export default BotonBorrarAntecedentePatologico;
