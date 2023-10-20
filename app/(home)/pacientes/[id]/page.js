import React from 'react';
import { formatearFecha, calcularEdad, formatearNumeroTelefono } from '@/utils/formats';
import { URL } from '@/config';
import FormularioPacienteId from '../../../../components/FormularioPacienteId';

const pacienteDetalle = async (id) => {
  return fetch(`${URL}/paciente/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function Paciente({ params }) {
  const { id } = params;
  const v = await pacienteDetalle(id);
  // console.log(id);

  return (
    <div>
      <h2 className="m-2 text-lg text-center font-bold text-md p-2 rounded-lg border">
        {v?.nombre} {v?.apellido}
      </h2>

      <details>
        <summary className='cursor-pointer text-right'>editar</summary>
        <FormularioPacienteId v={v}/>
      </details>

      <div className="flex flex-col items-start md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <details className="">
          <summary className="font-bold text-md cursor-pointer">Información de contacto</summary>
          <div>Email: {v?.email}</div>

          <div>Teléfono: {formatearNumeroTelefono(v?.telefono)}</div>
        </details>

        <details>
          <summary className="font-bold text-md cursor-pointer">Ante una emergencia</summary>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono de Emergencia: {formatearNumeroTelefono(v?.telefonoEmergencia)} (
            {v?.nombreContactoEmergencia})
          </div>
        </details>

        <details>
          <summary className="font-bold text-md cursor-pointer">En Kamalaya</summary>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de alta: {formatearFecha(v?.fechaAlta)}
          </div>
        </details>

        <details>
          <summary className="font-bold text-md cursor-pointer">Información personal</summary>

          <div>DNI: {v?.dni}</div>

          <div>
            Género:{' '}
            {v?.genero === 'M'
              ? 'Masculino'
              : v?.genero === 'F'
              ? 'Femenino'
              : 'otro'}
          </div>

          <div>
            Fecha de Nacimiento: {formatearFecha(v?.fechaDeNacimiento)} (
            {calcularEdad(v?.fechaDeNacimiento)} años)
          </div>

          <div>Hobbies: {v?.hobbies}</div>
        </details>

        <details>
          <summary className="font-bold text-md cursor-pointer">Domicilio</summary>

          <div>
            Calle: {v?.calle} {v?.numero}
          </div>

          <div>Localidad: {v?.localidad}</div>

          <div>
            {v?.provincia}, {v?.pais}({v?.codigoPostal})
          </div>
        </details>
      </div>
    </div>
  );
}
export default Paciente;
