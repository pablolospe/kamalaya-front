import React from 'react';
import { formatearFecha, calcularEdad } from '@/utils/formats';
import { URL } from '@/config';
import Link from 'next/link'
import SeguimientosTabla from '@/components/SeguimientosTabla'
import FormularioPacienteId from '@/components/FormularioPacienteId';

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
            <div><b>Fecha de alta</b> {formatearFecha(v?.fechaAlta)}</div>  
            <div><b>Cuidador principal</b> {v?.cuidadorPrincipal}</div>
            <div><b>Contacto del cuidador principal</b> {v?.telefonoCuidadorPrincipal}</div>
            <div><b>Insumos prestados</b> {v?.insumosPrestados}</div>
            <div><b>Supervisor</b> {v?.voluntario_id}</div>
            <div><b>voluntariosQueAcompañan</b> ...</div>
            <div><b>Fecha de baja</b> ...</div>
          </div>
        </details>

        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Información personal</summary>

          <div className="w-full mb-2 ml-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
            <div><b>Género</b> {' '}
              {v?.genero === 'M' ? 'Masculino' : v?.genero === 'F' ? 'Femenino' : 'otro'}
            </div>

            <div><b>Fecha de nacimiento: </b> {formatearFecha(v?.fechaDeNacimiento)} </div>
              
            <div> <b>Edad</b> {calcularEdad(v?.fechaDeNacimiento)} años </div>
            
            <div><b>DNI</b> {v?.dni}</div>
            <div><b>Email</b> {v?.email}</div>
            <div><b>Teléfono </b>{v?.telefono2 ? <span>{v?.telefono} / {v?.telefono2}</span> : v?.telefono}</div>
            <div><b>Dirección </b> {v?.calle} {v?.numero},  {v?.localidad}</div>
            <div>{v?.provincia}, {v?.pais}({v?.codigoPostal})</div>
            <div><b>Obra social </b> {v?.obraSocial}</div>
            <div><b>Ocupacion /Profesion / Hobbie:</b> {v?.ocupacionProfesionHobbie}</div>
            <div><b>Situacion economica </b> {v?.situacionEconomica}</div>
            <div><b>Situacion habitacional </b> {v?.situacionHabitacional}</div>
            <div><b>Recursos disponibles</b> {v?.recursosDisponibles}</div>
            <div><b>Recursos a explotar</b> {v?.recursosAExplotar}</div>
            <div><b>Familia</b> {v?.familia}</div>
          </div>
        
        </details>


        <details>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Resúmen clínico</summary>
          <div className="w-full mb-2 ml-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
            <div><b>Quien deriva </b> {v?.quienDeriva}</div>
            <div><b>Contacto de {v?.quienDeriva} (tel, mail) </b> {v?.contactoQuienDeriva}</div>
            <div><b>Diagnóstico</b> {v?.diagnostico}</div>
            <div><b>Fecha de diagnóstico: </b> {formatearFecha(v?.fechaDeDiagnostico)} </div>
            <div><b>Equipo de seguimiento</b> {v?.equipoSeguimiento}</div>
            <div><b>Enfermedad actual</b> {v?.enfermedadActual}</div>
            <div><b>ECOG basal</b> {v?.ECOGbasal}</div>
            <div><b>Antecedentes de enfermedades previas</b> {v?.antecedentesEnfermedadesPrevias}</div>
            <div><b>Medicacion actual</b> {v?.medicacionActual}</div>
            <div><b>El paciente conoce el diagnóstico?</b> {v?.pacienteConoceDiagnostico}</div>
            <div><b>El paciente conoce el pronóstico?</b> {v?.pacienteConocePronostico}</div>
            <div><b>La familia conoce el diagnóstico?</b> {v?.familiaConoceDiagnostico}</div>
            <div><b>La familia conoce el pronóstico?</b> {v?.familiaConocePronostico}</div>
            <div><b>Problemas actuales</b> {v?.problemasActuales}</div>
          </div>
        </details>
      </div>

        <br/>
        <Link href={`/pacientes/${id}/seguimiento`} className="w-40 m-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Agregar nuevo seguimiento
        </Link>
        <br/>
        <br/>
        <SeguimientosTabla id={id}/>

    </div>
  );
}
export default Paciente;
