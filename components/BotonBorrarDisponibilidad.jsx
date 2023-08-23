'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function BotonBorrarDisponibilidad(id) {
  const router = useRouter();
  
  const borrarDisponibilidadHandler = async (e) => {
      e.preventDefault()
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
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
    <div className="w-7 h-7 text-md text-center bg-red-500 text-white rounded-full hover:bg-gray-600">
      <button onClick={(e)=>(borrarDisponibilidadHandler(e))}>x</button>
    </div>
  );
}

export default BotonBorrarDisponibilidad;
