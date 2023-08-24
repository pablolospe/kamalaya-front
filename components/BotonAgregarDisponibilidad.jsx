'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { LuPlus } from 'react-icons/lu';

function BotonAgregarDisponibilidad(id) {
  const router = useRouter();

  const disponibilidadHandler = async (e) => {
    e.preventDefault();
    const { value: formData } = await Swal.fire({
      title: 'Agregar disponibilidad',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      html:
        '<label for="diaSemana">Día de la semana:</label>' +
        '<select id="diaSemana" class="swal2-input">' +
        '<option value="lunes">Lunes</option>' +
        '<option value="martes">Martes</option>' +
        '<option value="miercoles">Miércoles</option>' +
        '<option value="jueves">Jueves</option>' +
        '<option value="viernes">Viernes</option>' +
        '<option value="sabado">Sábado</option>' +
        '<option value="domingo">Domingo</option>' +
        '</select>' +
        '<br/>' +
        '<label for="horaInicio">Hora de inicio:</label>' +
        '<select id="horaInicio" class="swal2-input">' +
        '<option value="08:00">08:00</option>' +
        '<option value="09:00">09:00</option>' +
        '<option value="10:00">10:00</option>' +
        '<option value="11:00">11:00</option>' +
        '<option value="12:00">12:00</option>' +
        '<option value="13:00">13:00</option>' +
        '<option value="14:00">14:00</option>' +
        '<option value="15:00">15:00</option>' +
        '<option value="16:00">16:00</option>' +
        '<option value="17:00">17:00</option>' +
        '<option value="18:00">18:00</option>' +
        '<option value="19:00">19:00</option>' +
        '<option value="20:00">20:00</option>' +
        '</select>' +
        '<br/>' +
        '<label for="horaFin">Hora de fin:</label>' +
        '<select id="horaFin" class="swal2-input">' +
        '<option value="08:00">08:00</option>' +
        '<option value="09:00">09:00</option>' +
        '<option value="10:00">10:00</option>' +
        '<option value="11:00">11:00</option>' +
        '<option value="12:00">12:00</option>' +
        '<option value="13:00">13:00</option>' +
        '<option value="14:00">14:00</option>' +
        '<option value="15:00">15:00</option>' +
        '<option value="16:00">16:00</option>' +
        '<option value="17:00">17:00</option>' +
        '<option value="18:00">18:00</option>' +
        '<option value="19:00">19:00</option>' +
        '<option value="20:00">20:00</option>' +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          usuario_id: id.id,
          diaSemana: document.getElementById('diaSemana').value,
          horaInicio: document.getElementById('horaInicio').value,
          horaFin: document.getElementById('horaFin').value,
        };
      },
    });

    if (formData) {
      // const formDataJSON = JSON.stringify(formData);

      const response = await fetch(
        'https://kamalaya-dev.fl0.io/disponibilidad',
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
      // Aquí puedes hacer algo con los valores seleccionados, como enviarlos a una API
      Swal.fire(
        `Nueva disponibilidad el ${formData.diaSemana} de ${formData.horaInicio} a ${formData.horaFin}`
      );
    }
  };

  return (
    <div 
    className="flex align-middle justify-center text-xl font-bolder bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 rounded-lg ">
    
      <button onClick={(e) => disponibilidadHandler(e)}>
        <LuPlus />
      </button>
    </div>
  );
}

export default BotonAgregarDisponibilidad;
