import { formatearFecha, calcularEdad } from '@/utils/formats';
import { URL } from '@/config';
import Link from 'next/link'
import SeguimientosTabla from '@/components/SeguimientosTabla'
import style from './page.module.css';

const pacienteDetalle = async (id) => {
  return fetch(`${URL}/paciente/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function PacienteDetalles({ params }) {
  const { id } = params;
  const v = await pacienteDetalle(id);
console.log(v);
  return (
    <div className='flex flex-col'>
      <h2 className="my-2 w-full md:w-1/2 text-lg text-center self-center font-semibold bg-green-100 text-md p-2 rounded-lg border">
        {v?.nombre} {v?.apellido}
      </h2>

      <div className="flex flex-col md:mx-auto md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">

        <details className={style.details}>
          <summary 
          className="font-bold text-lg text-blue-900 cursor-pointer"
          >En Kamalaya</summary>

          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
            <div><b>Fecha de alta</b> {formatearFecha(v?.fechaAlta)}</div>  
            <div><b>Cuidador principal</b> {v?.cuidadorPrincipal}</div>
            <div><b>Contacto del cuidador principal</b> {v?.telefonoCuidadorPrincipal}</div>
            <div><b>Insumos prestados</b> {v?.insumosPrestados}</div>
            <div><b>Supervisor</b> {v?.Voluntario.nombre} {v?.Voluntario.apellido}</div>
            {/* <div><b>voluntariosQueAcompañan</b>{v?.Grupos?.Voluntarios[0]?.nombre}</div> */}
            {v?.fechaBaja && <div><b>Fecha de baja</b> {formatearFecha(v?.fechaBaja)}</div>}
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Información personal</summary>

          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
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


        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">Resúmen clínico</summary>
          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
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

        <details className={style.details}>
        <summary className="font-bold text-lg text-blue-900 cursor-pointer">Grupo</summary>
        {v.Grupos[0]
        ? 
        <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
          <div><b>Fecha de inicio: </b> {formatearFecha(v.Grupos[0]?.fechaDeInicio)}</div>
          <div><b>Dia de la semana: </b> {v.Grupos[0]?.diaSemana}</div>
          <div><b>Hora de inicio: </b> {v.Grupos[0]?.horaInicio}</div>
          <div><b>Hora de fin: </b> {v.Grupos[0]?.horaFin}</div>
          <div><b>Descripcion: </b> {v.Grupos[0]?.descripcion}</div>
          <div><b>Voluntarios: </b> {v.Grupos[0]?.Voluntarios.map(v=> 
            
            <span className="p-2 w-56 font-semibold text-blue-500 rounded-md hover:text-blue-800">
              <Link href={`/voluntarios/${v.voluntario_id}`}>{v.nombre} {v.apellido} </Link>
            </span>
          )}</div>
          
        </div>
        : 
        <div>Este paciente aún no posee grupo. 
          <span className="p-2 w-56 font-semibold text-blue-500 rounded-md hover:text-blue-800 border-solid ">
              <Link href={`/grupos/crear`} >Crear nuevo grupo </Link>
            </span>
        </div>
      }
        </details>
      </div>

      <div className='flex flex-col md:flex-row justify-center align-middle m-8 text-center gap-4'>
        <Link href={`/pacientes/${id}/seguimiento`} className="p-2 w-56 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Agregar nuevo seguimiento
        </Link>

        <Link href={`/pacientes/${id}/editar`} className="p-2 w-56 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Editar paciente
        </Link>
      </div>

      <SeguimientosTabla id={id}/>

    </div>
  );
}
export default PacienteDetalles;
