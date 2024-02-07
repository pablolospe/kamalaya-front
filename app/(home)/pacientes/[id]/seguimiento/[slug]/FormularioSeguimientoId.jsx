'use client';
import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSeguimientoId } from '@/utils/fetchSeguimientoId';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { pacientes } from '@/utils/fetchPacientes';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { convertirHora } from '@/utils/formats';

function EditarSeguimiento() {
  const { id, slug } = useParams();
  console.log(id, slug);
  
  const [voluntario1, setVoluntario1] = useState('13');
  const [voluntario2, setVoluntario2] = useState('');
  const [voluntario3, setVoluntario3] = useState('');
  const [voluntariosData, setVoluntariosData] = useState([]);
  const [grupo, setGrupo] = useState({
    // seguimiento_id: slug,
    fecha: '2024-01-01',
    horaInicio: '10:00',
    horaFin: '11:00',
    evolucion: 'bien',
    llamadaOVisita: 'visita',
    problemasActualesYNecesidades: 'bien',
    ECOG:'',
    paciente_id: +id,
    voluntario_id: [],
  });

  const router = useRouter();
  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      // const gruposData = await fetchSeguimientoId(id);
      // const voluntariosData = await voluntarios(query);
      // setGrupo(gruposData);
      // console.log(gruposData);
      // setVoluntariosData(voluntariosData);
      // setVoluntario1(gruposData?.Voluntarios[0])
      // console.log(voluntario1);
    }
    fetchData();
  }, [query, setVoluntariosData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrupo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(grupo);

    const updatedVoluntarioId = [voluntario1, voluntario2, voluntario3].filter(
      (voluntario) => voluntario !== ''
    );

    const grupoToSubmit = {
      ...grupo,
      voluntario_id: [13,14],
    };
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres modificar este grupo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sí, ingresar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/seguimiento/${slug}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(grupoToSubmit),
          });

          if (response.ok) {
            Swal.fire({
              text: 'Seguimiento modificado correctamente',
              icon: 'success',
              confirmButtonColor: 'gray',
              color: 'black',
            }).then(router.push(`/pacientes/${id}`));

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

  const handleVoluntario1Change = (e) => {
    setVoluntario1(Number(e.target.value));
  };

  const handleVoluntario2Change = (e) => {
    setVoluntario2(Number(e.target.value));
  };

  const handleVoluntario3Change = (e) => {
    setVoluntario3(Number(e.target.value));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col align-middle justify-center items-center gap-2 bg-gray-100"
    >
      <h1 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Crear nuevo grupo
      </h1>

      <div className="flex flex-col md:flex-row justify-evenly align-center max-w-xl gap-8">
        <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
          <div className="flex flex-col justify-evenly align-center max-w-xl gap-4">
            EN CONTRSUCCION
{/* 
            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="voluntario1"
              >
                Voluntario 1
              </label>
              <select
                required
                onChange={handleVoluntario1Change}
                value={voluntario1}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="">Elige un voluntario</option>
                {voluntariosData?.map((p) => (
                  <option value={p.voluntario_id} key={p.voluntario_id}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="voluntario2"
              >
                Voluntario 2
              </label>
              <select
                onChange={handleVoluntario2Change}
                value={voluntario2}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="">Elige un voluntario</option>
                {voluntariosData?.map((p) => (
                  <option value={p.voluntario_id} key={p.voluntario_id}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="voluntario3"
              >
                Voluntario 3
              </label>
              <select
                onChange={handleVoluntario3Change}
                value={voluntario3}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="">Elige un voluntario</option>
                {voluntariosData?.map((p) => (
                  <option value={p.voluntario_id} key={p.voluntario_id}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
            </div> */}


            {/* <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="fecha"
            >
              Fecha de inicio:
            </label>
            <input
              name="fecha"
              required
              value={grupo?.fecha}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="date"
              id="fecha"
            ></input> */}

{/* 
            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="horaInicio"
              >
                Hora de inicio:
              </label>
              <select
                name="horaInicio"
                required
                // value={convertirHora(grupo.horaInicio)}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="date"
                id="horaInicio"
              >
                <option value="">Seleccione hora de inicio</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="horaFin"
              >
                Hora de fin:
              </label>
              <select
                name="horaFin"
                required
                // value={convertirHora(grupo.horaFin)}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="date"
                id="horaFin"
              >
                <option value="">Seleccione hora de fin</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div> */}

            {/* <div className="sm:col-span-2">
              <label
                htmlFor="problemasActualesYNecesidades"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Problemas actuales y necesidades
              </label>
              <textarea
                name="problemasActualesYNecesidades"
                value={grupo?.problemasActualesYNecesidades}
                onChange={handleChange}
                id="problemasActualesYNecesidades"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Describe la descripcion del grupo"
              ></textarea>
            </div> */}
          </div>
        </div>

        <div>
          <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
            {/* <p>
              Paciente:{' '}
              {
                pacientesData.find((p) => p.paciente_id === grupo.paciente_id)
                  ?.nombre
              }{' '}
              {
                pacientesData.find((p) => p.paciente_id === grupo.paciente_id)
                  ?.apellido
              }
            </p>
            <p>
              Voluntario 1:{' '}
              {
                voluntariosData.find((v) => v.voluntario_id === voluntario1)
                  ?.nombre
              }{' '}
              {
                voluntariosData.find((v) => v.voluntario_id === voluntario1)
                  ?.apellido
              }
            </p>
            <p>
              Voluntario 2:{' '}
              {
                voluntariosData.find((v) => v.voluntario_id === voluntario2)
                  ?.nombre
              }{' '}
              {
                voluntariosData.find((v) => v.voluntario_id === voluntario2)
                  ?.apellido
              }
            </p>

            <p>
              Voluntario 3:{' '}
              {
                voluntariosData.find((v) => v.voluntario_id === voluntario3)
                  ?.nombre
              }{' '}
              {
                voluntariosData.find((v) => v.voluntario_id === voluntario3)
                  ?.apellido
              }
            </p> */}

            
            <p>Fecha de inicio: {grupo?.fecha}</p>
            {/* <p>Hora de inicio: {convertirHora(grupo.horaInicio)}</p> */}
            {/* <p>Hora de finalización: {convertirHora(grupo.horaFin)}</p> */}
            <p>Problemas actuales y necesidades: {grupo?.problemasActualesYNecesidades}</p>
          </div>

          <section>
            <button
              type="submit"
              className="mt-4 py-2 px-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Enviar formulario
            </button>
          </section>
        </div>
      </div>
    </form>
  );
}

export default EditarSeguimiento;
