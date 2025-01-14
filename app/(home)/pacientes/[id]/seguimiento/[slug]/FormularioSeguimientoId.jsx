'use client';
import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSeguimientoId } from '@/utils/fetchSeguimientoId';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { obtenerFecha, capitalizeFirstLetterOfEachWord } from '@/utils/formats';
import { useSession } from 'next-auth/react';
import BotonBack from '@/components/BotonBack';

function EditarSeguimiento() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { id, slug } = useParams();
  const [voluntario1, setVoluntario1] = useState('');
  const [voluntario2, setVoluntario2] = useState('');
  const [voluntario3, setVoluntario3] = useState('');
  const [voluntariosData, setVoluntariosData] = useState([]);
  const [seguimiento, setSeguimiento] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    evolucion: '',
    llamadaOVisita: '',
    problemasActualesYNecesidades: '',
    ECOG: '',
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
      const seguimientoData = await fetchSeguimientoId(slug);
      const voluntarioData = await voluntarios(query, token);

      setSeguimiento(seguimientoData[0]);
      setVoluntariosData(voluntarioData);
      setVoluntario1(seguimientoData[0]?.Voluntarios[0]?.voluntario_id || '')
      setVoluntario2(seguimientoData[0]?.Voluntarios[1]?.voluntario_id || '')
      setVoluntario3(seguimientoData[0]?.Voluntarios[2]?.voluntario_id || '')
      console.log(seguimientoData[0]?.Voluntarios[0]);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fecha') {
      setSeguimiento((prevData) => ({
        ...prevData,
        fecha: obtenerFecha(value),
      }));
    } else {
      setSeguimiento((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedVoluntarioId = [voluntario1, voluntario2, voluntario3]
      .filter(voluntario => voluntario !== '' && voluntario !== 0);
  
    const seguimientoToSubmit = {
      ...seguimiento,
      voluntario_id: updatedVoluntarioId,
    };
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres modificar este seguimiento?',
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
            body: JSON.stringify(seguimientoToSubmit),
          });
  
          if (response.ok) {
            Swal.fire({
              text: 'Seguimiento modificado correctamente',
              icon: 'success',
              confirmButtonColor: 'gray',
              color: 'black',
            }).then(() => router.push(`/pacientes/${id}`));
  
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

  const filterVoluntarios = (exclude) => {
    if (!voluntariosData) return []; // Retorna un array vacío si voluntariosData es null o undefined
    return voluntariosData.filter(v => !exclude.includes(v.voluntario_id));
  };

  return (
    <div className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Editar seguimiento
      </h2>

      <BotonBack />

      <form onSubmit={handleSubmit} >
        <div className="flex flex-col md:flex-row justify-evenly align-center max-w-xl gap-8">
          <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
            <div className="flex flex-col  justify-evenly align-center max-w-xl gap-4">

              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="voluntario1"
                >
                  Voluntario 1
                </label>
                <select
                  required
                  onChange={(e) => setVoluntario1(Number(e.target.value))}
                  value={voluntario1}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="">Elige un voluntario</option>
                  {filterVoluntarios([voluntario2, voluntario3]).map((p) => (
                    <option value={p.voluntario_id} key={p.voluntario_id}>
                      {capitalizeFirstLetterOfEachWord(`${p.nombre}`)} {capitalizeFirstLetterOfEachWord(`${p.apellido}`)}
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
                  onChange={(e) => setVoluntario2(Number(e.target.value))}
                  value={voluntario2}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value=''></option>
                  {filterVoluntarios([voluntario1, voluntario3]).map((p) => (
                    <option value={p.voluntario_id} key={p.voluntario_id}>
                      {capitalizeFirstLetterOfEachWord(`${p.nombre}`)} {capitalizeFirstLetterOfEachWord(`${p.apellido}`)}
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
                  onChange={(e) => setVoluntario3(Number(e.target.value))}
                  value={voluntario3}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value=''></option>
                  {filterVoluntarios([voluntario1, voluntario2]).map((p) => (
                    <option value={p.voluntario_id} key={p.voluntario_id}>
                      {capitalizeFirstLetterOfEachWord(`${p.nombre}`)} {capitalizeFirstLetterOfEachWord(`${p.apellido}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 max-w-md shadow-lg rounded-lg">
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1">

              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="fecha"
              >
                Fecha de inicio:
              </label>
              <input
                name="fecha"
                required
                value={seguimiento?.fecha}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="date"
                id="fecha"
              ></input>


              <div className="col-span-1">
                <label
                  htmlFor="horaInicio"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hora de inicio
                </label>
                <input
                  name="horaInicio"
                  required
                  value={seguimiento.horaInicio}
                  onChange={handleChange}
                  type="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="horaFin"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hora de fin
                </label>
                <input
                  name="horaFin"
                  required
                  value={seguimiento.horaFin}
                  onChange={handleChange}
                  type="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

            </div>
          </div>
        </div>

        <div className="p-4 max-w-md shadow-lg rounded-lg">
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1">
              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="ECOG"
                >
                  ECOG
                </label>
                <select
                  name="ECOG"
                  value={seguimiento.ECOG}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  type="date"
                  id="ECOG"
                >
                  <option value="">Elije una opción</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="llamadaOVisita"
                >
                  Visita o llamada
                </label>
                <select
                  name="llamadaOVisita"
                  required
                  value={seguimiento.llamadaOVisita}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  type="date"
                  id="llamadaOVisita"
                >
                  <option value="visita">Visita</option>
                  <option value="llamada">Llamada</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="evolucion"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Evolución
                </label>
                <textarea
                  name="evolucion"
                  value={seguimiento?.evolucion}
                  onChange={handleChange}
                  id="evolucion"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Describe la descripcion del seguimiento"
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="problemasActualesYNecesidades"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Problemas actuales y necesidades
                </label>
                <textarea
                  name="problemasActualesYNecesidades"
                  value={seguimiento?.problemasActualesYNecesidades}
                  onChange={handleChange}
                  id="problemasActualesYNecesidades"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Describe la descripcion del seguimiento"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <section>
          <button
            type="submit"
            className="mt-4 py-2 px-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enviar formulario
          </button>
        </section>
      </form>
    </div>
  );
}

export default EditarSeguimiento;
