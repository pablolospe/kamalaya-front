'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { LuX } from 'react-icons/lu';

function BotonBorrarAntecedenteAcompniamiento(id) {
  const router = useRouter();

  const borrarAcompaniamientoHandler = async (e) => {
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
          `https://kamalaya-dev.fl0.io/acompaniamiento/${id.id}`,
          // `http://localhost:8000/acompaniamiento/${id.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        Swal.fire({title:'Borrado', text:'El antecedente de acompañamiento ha sido eliminado', 
        icon:'success', confirmButtonColor: '#3085d6',}).then(
          router.refresh()
        );
      }
    });
  };

  return (
    <div className="flex align-middle justify-center text-md bg-red-400 hover:bg-red-500 cursor-pointer p-1 rounded-lg ">
      <button onClick={(e) => borrarAcompaniamientoHandler(e)}>
        <LuX />
      </button>
    </div>
  );
}

export default BotonBorrarAntecedenteAcompniamiento;
