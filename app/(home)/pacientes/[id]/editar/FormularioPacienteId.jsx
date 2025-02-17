'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { URL } from '@/config';
import GoogleMapsView from '../../../../../components/GoogleMapsView';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchPacienteId } from '@/utils/fetchPacienteId';

const FormularioPacienteId = () => {
  const { id } = useParams();
  const router = useRouter();
  const [voluntariosData, setVoluntariosData] = useState();

  const [formData, setFormData] = useState({
    voluntario_id: '',
    fechaAlta: '',
    fechaBaja: '',
    cuidadorPrincipal: '',
    telefonoCuidadorPrincipal: '',
    insumosPrestados: '',

    nombre: '',
    apellido: '',
    genero: '',
    fechaDeNacimiento: '',
    dni: '',
    email: '',
    telefono: '',
    telefono2: '',
    lat: '',
    lng: '',
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    pais: '',
    codigoPostal: '',

    obraSocial: '',
    ocupacionProfesionHobbie: '',
    situacionEconomica: '',
    situacionHabitacional: '',

    quienDeriva: '',
    contactoQuienDeriva: '',
    diagnostico: '',
    fechaDeDiagnostico: '',
    enfermedadActual: '',
    ECOGbasal: '',
    antecedentesEnfermedadesPrevias: '',
    medicacionActual: '',
    equipoSeguimiento: '',

    pacienteConoceDiagnostico: '',
    pacienteConocePronostico: '',
    familiaConoceDiagnostico: '',
    familiaConocePronostico: '',
    problemasActuales: '',
    recursosDisponibles: '',
    recursosAExplotar: '',
    familia: '',
  });

  useEffect(() => {
    async function fetchData() {
      const voluntariosData = await voluntarios();
      const paciente = await fetchPacienteId(id);
      setVoluntariosData(voluntariosData);
      setFormData(paciente ? paciente : null);
    }
    fetchData();
  }, [setVoluntariosData]);

  if (!formData) {
    // Renderiza algún tipo de indicador de carga, u otro componente
    // mientras la información de formData se está cargando
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataJSON = JSON.stringify(formData);

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar los datos de este paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sí, ingresar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${URL}/paciente/${formData?.paciente_id}`,
            {
              method: 'PUT',
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
            }).then(router.push(`/pacientes/${formData?.paciente_id}`));

            console.log('Datos enviados exitosamente');
          } else {
            console.error('Error al enviar los datos');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const direccion = `${formData.calle} ${formData.numero} ${formData.localidad} ${formData.provincia} ${formData.pais}`;

    try {
      // Hacer una solicitud a la API de Geocodificación de Google Maps
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=AIzaSyBZXt6a5CJSfGyf9q5ymoWmrzUD_XT66DM`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === 'OK') {
          // Obtener las coordenadas geográficas (latitud y longitud) de la respuesta
          const { lat, lng } = data.results[0].geometry.location;
          setFormData((prevData) => ({
            ...prevData,
            lat: lat.toString(),
            lng: lng.toString(),
          }));
        } else {
          console.error('Error al obtener las coordenadas');
        }
      } else {
        console.error('Error en la solicitud HTTP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const isVoluntarioField = e.target.name === 'voluntario_id';

    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (isVoluntarioField && newValue) {
      newValue = Number(newValue);
    }
    if (name === 'diaSemana' || name === 'horaInicio' || name === 'horaFin') {
      setFormData((prevData) => ({
        ...prevData,
        Disponibilidades: [
          { ...prevData.Disponibilidades[0], [name]: newValue },
        ],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
    >
        <Link
          href={`/pacientes/${formData.paciente_id}`}
          className="fixed py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 self-end font-semibold"
        >
          &larr;
        </Link>
      <div
        className='md:w-[60%] lg:w-[45%] flex flex-col items-center '
      >

        <h3 className="mt-4 font-bold text-md text-center">En Kamalaya</h3>
        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg w-full">
          <label>
            Fecha de alta:
            <input
              required
              type="date"
              name="fechaAlta"
              value={formData.fechaAlta}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Fecha de baja:
            <input
              type="date"
              name="fechaBaja"
              value={formData.fechaBaja}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block mb-2">
            Supervisor:
            <select
              required
              name="voluntario_id"
              value={formData.voluntario_id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Elige un voluntario</option>
              {voluntariosData?.map((v) => (
                <option key={v?.voluntario_id} value={v?.voluntario_id}>
                  {v?.nombre} {v?.apellido}
                </option>
              ))}
            </select>
          </label>

          <label>
            Cuidador principal
            <input
              type="text"
              name="cuidadorPrincipal"
              value={formData.cuidadorPrincipal}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Teléfono del cuidador principal
            <input
              type="text"
              name="telefonoCuidadorPrincipal"
              value={formData.telefonoCuidadorPrincipal}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Insumos prestados
            <input
              type="text"
              name="insumosPrestados"
              value={formData.insumosPrestados}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
            <br />

        <h3 className="m-2 font-bold text-md text-center">
          Información personal
        </h3>

        <div className="flex flex-col p-4 gap-2 shadow-lg rounded-lg w-full">
          <div className="flex flex-col gap-6 md:flex-row justify-evenly">
            <label>
              Nombre/s:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label>
              Apellido/s:
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label className="block mb-2">
              Género:
              <select
                required
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">Elije una opcion</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-6 md:flex-row justify-evenly">
            <label>
              Fecha de Nacimiento:
              <input
                type="date"
                name="fechaDeNacimiento"
                value={formData.fechaDeNacimiento}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>
            <label>
              DNI:
              <input
                type="number"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>
          </div>
          <div className="flex flex-col gap-6 md:flex-row justify-evenly">
            <label>
              Teléfono:
              <input
                type="number"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label>
              Teléfono 2:
              <input
                type="number"
                name="telefono2"
                value={formData.telefono2}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>
          </div>
        </div>
        <br />

        <h3 className="mt-4 font-bold text-md text-center">Domicilio</h3>
        <div className="flex flex-col p-4 gap-2 shadow-lg rounded-lg w-full">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <label>
              Calle:
              <input
                type="text"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label>
              Número:
              <input
                type="number"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <label>
              Localidad:
              <input
                type="text"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label>
              Provincia:
              <input
                type="text"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <label>
              País:
              <input
                type="text"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label>
              Código Postal:
              <input
                type="number"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>
          </div>
          <button
            className="h-min bg-red-400 p-1 border rounded-md hover:bg-red-500 ease-in-out"
            onClick={handleClick}
          >
            buscar en el mapa
          </button>
          <GoogleMapsView marker={[formData]} />
        </div>
        <br />

        <h3 className="mt-4 font-bold text-md text-center">Recursos</h3>
        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg w-full">
          <label>
            Obra social:
            <input
              type="tel"
              name="obraSocial"
              value={formData.obraSocial}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Ocupación, profesión, hobbies:
            <input
              type="text"
              name="ocupacionProfesionHobbie"
              value={formData.ocupacionProfesionHobbie}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Situación económica
            <input
              type="text"
              name="situacionEconomica"
              value={formData.situacionEconomica}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Situacion habitacional
            <input
              type="text"
              name="situacionHabitacional"
              value={formData.situacionHabitacional}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label>
            Familia
            <textarea
              rows={2}
              type="text"
              name="familia"
              value={formData.familia}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
        <br />

        <h3 className="mt-4 font-bold text-md text-center">Resumen clínico</h3>
        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg w-full">
          <label>
            Quien deriva
            <input
              type="tel"
              name="quienDeriva"
              value={formData.quienDeriva}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Contacto quien deriva
            <input
              type="text"
              name="contactoQuienDeriva"
              value={formData.contactoQuienDeriva}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Diagnóstico
            <input
              type="text"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Fecha del diagnóstico
            <input
              // required
              type="date"
              name="fechaDeDiagnostico"
              value={formData.fechaDeDiagnostico}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Enfermedad actual
            <input
              type="text"
              name="enfermedadActual"
              value={formData.enfermedadActual}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label>
            ECOG basal
            <select
              name="ECOGbasal"
              value={formData.ECOGbasal}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Elige un valor</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Antecedentes de enfermedades previas
            <input
              type="text"
              name="antecedentesEnfermedadesPrevias"
              value={formData.antecedentesEnfermedadesPrevias}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label>
            Medicacion actual
            <input
              type="text"
              name="medicacionActual"
              value={formData.medicacionActual}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label>
            Equipo de seguimiento
            <input
              type="text"
              name="equipoSeguimiento"
              value={formData.equipoSeguimiento}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
        <br />

        <h3 className="mt-4 font-bold text-md text-center">Diagnóstico</h3>
        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg w-full">
          <label className="flex flex-row w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 gap-2">
            Paciente conoce el diagnóstico
            <select
              name="pacienteConoceDiagnostico"
              value={formData.pacienteConoceDiagnostico}
              onChange={handleChange}
              className="flex flex-row w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="Falta preguntar">Falta preguntar</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="flex flex-row w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 gap-2">
            Paciente conoce el pronóstico
            <select
              name="pacienteConocePronostico"
              value={formData.pacienteConocePronostico}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="Falta preguntar">Falta preguntar</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="flex flex-row w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 gap-2">
            Familia conoce el diagnostico
            <select
              name="familiaConoceDiagnostico"
              value={formData.familiaConoceDiagnostico}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="Falta preguntar">Falta preguntar</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="flex flex-row w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 gap-2">
            Familia conoce el pronóstico
            <select
              name="familiaConocePronostico"
              value={formData.familiaConocePronostico}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="Falta preguntar">Falta preguntar</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>

          <label>
            Problemas actuales
            <input
              type="text"
              name="problemasActuales"
              value={formData.problemasActuales}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label>
            Recursos disponibles
            <input
              type="text"
              name="recursosDisponibles"
              value={formData.recursosDisponibles}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label>
            Recursos a explotar
            <input
              type="text"
              name="recursosAExplotar"
              value={formData.recursosAExplotar}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>

        <br />
        <button
          type="submit"
          className="w-40 mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enviar formulario
        </button>
        <br />
        <br />
      </div>
    </form>
  );
};

export default FormularioPacienteId;
