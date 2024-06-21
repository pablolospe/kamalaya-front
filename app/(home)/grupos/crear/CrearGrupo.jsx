'use client';
import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { pacientes } from '@/utils/fetchPacientes';
import Swal from 'sweetalert2';
import BotonBack from '@/components/BotonBack';
import { capitalizeFirstLetterOfEachWord } from '@/utils/formats';

function CrearGrupo({ paciente_id }) {
  const [voluntario1, setVoluntario1] = useState('');
  const [voluntario2, setVoluntario2] = useState('');
  const [voluntario3, setVoluntario3] = useState('');
  const [pacientesData, setPacientesData] = useState([]);
  const [voluntariosData, setVoluntariosData] = useState([]);
  const [grupo, setGrupo] = useState({
    diaSemana: '',
    fechaDeInicio: '',
    horaInicio: '',
    horaFin: '',
    paciente_id: '',
    voluntario_id: [],
    descripcion: '',
    activo: true,
  });

  const router = useRouter();
  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      const pacienteData = await pacientes(query);
      const voluntariosData = await voluntarios(query);

      setPacientesData(pacienteData);
      setVoluntariosData(voluntariosData);
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

  const handlePacienteChange = (e) => {
    setGrupo((prevGrupo) => ({
      ...prevGrupo,
      paciente_id: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVoluntarioId = [voluntario1, voluntario2, voluntario3].map(
      (voluntario) => voluntario?.voluntario_id
    ).filter((id) => id !== undefined);

    const grupoToSubmit = {
      ...grupo,
      voluntario_id: updatedVoluntarioId,
    };

    console.log(grupoToSubmit);
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear este grupo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sí, ingresar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/grupo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(grupoToSubmit),
          });

          if (response.ok) {
            Swal.fire({
              text: 'Grupo creado correctamente',
              icon: 'success',
              confirmButtonColor: 'gray',
              color: 'black',
            }).then(router.push('/grupos'));

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

  const handleVoluntarioChange = (setVoluntario) => (e) => {
    const selectedVoluntario = voluntariosData.find(v => v.voluntario_id === Number(e.target.value));
    setVoluntario(selectedVoluntario);
  };

  const getFilteredVoluntarios = (currentVoluntarioId) => {
    const selectedVoluntariosIds = [
      voluntario1?.voluntario_id,
      voluntario2?.voluntario_id,
      voluntario3?.voluntario_id,
    ].filter(id => id !== currentVoluntarioId && id !== undefined);

    return voluntariosData.filter(voluntario => !selectedVoluntariosIds.includes(voluntario.voluntario_id));
  };

  return (
    <div className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Crear nuevo grupo
      </h2>

      <BotonBack />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
      >

        <div className="flex flex-col md:flex-row justify-evenly align-center max-w-xl gap-8">
          <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
            <div className="flex flex-col justify-evenly align-center max-w-xl gap-4">
              <div>
                <select
                  onChange={handlePacienteChange}
                  name="paciente_id"
                  value={grupo.paciente_id}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value=""> Elije un paciente </option>
                  {pacientesData?.map((p) => (
                    <option value={p.paciente_id} key={p.paciente_id}>
                      {p.nombre} {p.apellido}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="voluntario1"
                >
                  Voluntario 1
                </label>
                <select
                  required
                  onChange={handleVoluntarioChange(setVoluntario1)}
                  value={voluntario1.voluntario_id || ''}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="">Elige un voluntario</option>
                  {getFilteredVoluntarios(voluntario1.voluntario_id).map((p) => (
                    <option value={p.voluntario_id} key={p.voluntario_id}>
                      {capitalizeFirstLetterOfEachWord(`${p.nombre} ${p.apellido}`)}
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
                  onChange={handleVoluntarioChange(setVoluntario2)}
                  value={voluntario2?.voluntario_id || ''}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="">Elige un voluntario</option>
                  {getFilteredVoluntarios(voluntario2?.voluntario_id).map((p) => (
                    <option value={p.voluntario_id} key={p.voluntario_id}>
                      {capitalizeFirstLetterOfEachWord(`${p.nombre} ${p.apellido}`)}
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
                  onChange={handleVoluntarioChange(setVoluntario3)}
                  value={voluntario3?.voluntario_id || ''}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="">Elige un voluntario</option>
                  {getFilteredVoluntarios(voluntario3?.voluntario_id).map((p) => (
                    <option value={p.voluntario_id} key={p.voluntario_id}>
                      {capitalizeFirstLetterOfEachWord(`${p.nombre} ${p.apellido}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={grupo.descripcion}
                  onChange={handleChange}
                  id="descripcion"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Describe la descripcion del grupo"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="p-4 max-w-md shadow-lg rounded-lg">
            <div className="grid grid-cols-1 gap-2">
              <div className="col-span-1">


                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="fechaInicio"
                >
                  Fecha de inicio:
                </label>
                <input
                  name="fechaDeInicio"
                  required
                  value={grupo.fechaDeInicio}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  type="date"
                  id="fechaDeInicio"
                ></input>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="diaSemana"
                  >
                    Día de la semana:
                  </label>
                  <select
                    name="diaSemana"
                    required
                    value={grupo.diaSemana}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Selecciona un día</option>
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                  </select>
                </div>

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
                    value={grupo.horaInicio}
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
                    value={grupo.horaFin}
                    onChange={handleChange}
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-40 mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enviar formulario
        </button>
      </form>
    </div>
  );
}

export default CrearGrupo;
