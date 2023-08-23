'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { LuPlus } from 'react-icons/lu';

function BotonAgregarAntecedenteDeAcompaniamiento(id) {
  const router = useRouter();

  const antecedenteAcompaniamiento = async (e) => {
    e.preventDefault();
    const { value: formData } = await Swal.fire({
      title: 'Agregar antecedente de acompañamiento',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      html:
        '<label for="institucion">Institución:</label>' +
        '<input id="institucion" class="swal2-input">' +
        '</input>' +
        '<br/>' +
        '<label for="tareasRealizadas">Tareas:</label>' +
        '<input id="tareasRealizadas" class="swal2-input">' +
        '</input>' +
        '<br/>' +
        '<label for="detalles">Comentarios:</label>' +
        '<input id="detalles" class="swal2-input">' +
        '</input>' +
        '<br/>' +
        '<label for="fechaInicio">Hora de inicio:</label>' +
        '<input type="date" id="fechaInicio" class="swal2-input">' +
        '</input>' +
        '<br/>' +
        '<label for="fechaFin">Hora de inicio:</label>' +
        '<input type="date" id="fechaFin" class="swal2-input">' +
        '</input>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          usuario_id: id.id,
          institucion: document.getElementById('institucion').value,
          tareasRealizadas: document.getElementById('tareasRealizadas').value,
          detalles: document.getElementById('detalles').value,
          fechaInicio: document.getElementById('fechaInicio').value,
          fechaFin: document.getElementById('fechaFin').value,
        };
      },
    });
  
    if (formData) {
      // const formDataJSON = JSON.stringify(formData);

      const response = await fetch(
        'https://kamalaya-dev.fl0.io/acompaniamiento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          text: 'Formulario ingresado correctamente',
          icon: 'success',
          confirmButtonColor: 'gray',
          color: 'black',
        }).then(router.refresh());
      } else {
        console.error('Error al enviar los datos');
      }

      console.log('Formulario:', response);
      
      Swal.fire({
        text:`Acompaniamiento ingresado`,
        confirmButtonColor: '#3085d6',
      });
    }
  };

  return (
    <div 
    className="flex align-middle justify-center text-xl font-bolder bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 rounded-lg ">
    
      <button onClick={(e) => antecedenteAcompaniamiento(e)}>
        <LuPlus />
      </button>
    </div>
  );
}

export default BotonAgregarAntecedenteDeAcompaniamiento;
