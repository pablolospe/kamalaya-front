'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { LuX } from 'react-icons/lu';

function BotonBorrarDisponibilidad(id) {
  const router = useRouter();
  
  const borrarDisponibilidadHandler = async (e) => {
      e.preventDefault()
      Swal.fire({
        title: '¿Estás segur@?',
        text: "Esta acción no se puede revertir",
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
            `https://kamalaya-dev.fl0.io/disponibilidad/${id.id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }
            );

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(router.refresh());
        }
      })

      
    };
    

  return (
    <div 
    className="flex align-middle justify-center text-lg font-bolder bg-red-400 hover:bg-red-500 cursor-pointer p-1 rounded-lg ">
      <button onClick={(e)=>(borrarDisponibilidadHandler(e))}><LuX /></button>
    </div>
  );
}

export default BotonBorrarDisponibilidad;
