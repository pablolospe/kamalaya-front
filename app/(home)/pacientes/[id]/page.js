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

        <details>
          <summary 
          className="font-bold text-lg text-blue-900 cursor-pointer"
          >En Kamalaya</summary>

          <div className="w-full mb-2 ml-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
            <div><b>Fecha de alta:</b> {formatearFecha(v?.fechaAlta)}</div>  
            <div><b>Cuidador principal:</b> {v?.cuidadorPrincipal}</div>
            <div><b>Contacto del cuidador principal:</b> {v?.telefonoCuidadorPrincipal}</div>
            <div><b>Insumos prestados:</b> {v?.insumosPrestados}</div>
            <div><b>voluntariosQueAcompañan:</b>...</div>
          </div>
        </details>

        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Información personal</summary>

          <div>
          <b>Género:</b> {' '}
            {v?.genero === 'M'
              ? 'Masculino'
              : v?.genero === 'F'
              ? 'Femenino'
              : 'otro'}
          </div>

          <div><b>Fecha de Nacimiento: </b> {formatearFecha(v?.fechaDeNacimiento)} 
          </div>
            
          <div>
            <b>Edad</b> {calcularEdad(v?.fechaDeNacimiento)} años
          </div>
          
          <div><b>DNI:</b> {v?.dni}</div>
          <div><b>Email:</b> {v?.email}</div>
          <div><b>Teléfono: </b>{v?.telefono2 ? <span>{v?.telefono} / {v?.telefono2}</span> : v?.telefono}</div>
          <div><b>Dirección:</b> {v?.calle} {v?.numero},  {v?.localidad}</div>
          <div>{v?.provincia}, {v?.pais}({v?.codigoPostal})</div>
        </details>

        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Recursos</summary>
     
          <div><b>Obra social:</b> {v?.obraSocial}</div>
          <div><b>Ocupacion /Profesion / Hobbie:</b> {v?.ocupacionProfesionHobbie}</div>
          <div><b>Situacion economica:</b> {v?.situacionEconomica}</div>
          <div><b>Situacion habitacional:</b> {v?.situacionHabitacional}</div>
        </details>

        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Resúmen clínico</summary>
     
          <div><b>Quien deriva:</b> {v?.quienDeriva}</div>
          <div><b>Contacto de quien deriva (tel, mail):</b> {v?.contactoQuienDeriva}</div>
          <div><b>Enfermedad actual:</b> {v?.enfermedadActual}</div>
          <div><b>ECOG basal:</b> {v?.ECOGbasal}</div>
          <div><b>Antecedentes de enfermedades previas:</b> {v?.antecedentesEnfermedadesPrevias}</div>
          <div><b>Medicacion actual:</b> {v?.medicacionActual}</div>
          <div><b>Equipo de seguimiento:</b> {v?.equipoSeguimiento}</div>
        </details>

        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Diagnóstico</summary>
     
          <div><b>El paciente conoce el diagnóstico?</b> {v?.pacienteConoceDiagnostico === null ? 'falta preguntar' : v?.pacienteConoceDiagnostico ? 'Si' : 'No'}</div>
          <div><b>El paciente conoce el pronóstico?</b> {v?.pacienteConocePronostico === null ? 'falta preguntar' : v?.pacienteConocePronostico ? 'Si' : 'No'}</div>
          <div><b>La familia conoce el diagnóstico?</b> {v?.familiaConoceDiagnostico === null ? 'falta preguntar' : v?.familiaConoceDiagnostico ? 'Si' : 'No'}</div>
          <div><b>La familia conoce el pronóstico?</b> {v?.familiaConocePronostico === null ? 'falta preguntar' : v?.familiaConocePronostico ? 'Si' : 'No'}</div>
          <div><b>Problemas actuales</b> {v?.problemasActuales}</div>
          <div><b>Recursos disponibles</b> {v?.recursosDisponibles}</div>
          <div><b>Recursos a explotar</b> {v?.recursosAExplotar}</div>
        </details>

        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Familia</summary>
          <div><b>Familia:</b>{v?.familia}</div>
        </details>

      </div>
    </div>
  );
}
export default Paciente;
