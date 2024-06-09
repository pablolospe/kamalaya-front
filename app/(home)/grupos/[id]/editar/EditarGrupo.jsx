'use client';
import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGrupoId } from '@/utils/fetchGrupoId';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { pacientes } from '@/utils/fetchPacientes';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { capitalizeFirstLetterOfEachWord } from '@/utils/formats';

function EditarGrupo() {
  const { id } = useParams();
  const [voluntario1, setVoluntario1] = useState({});
  const [voluntario2, setVoluntario2] = useState({});
  const [voluntario3, setVoluntario3] = useState({});
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
    activo: false,
  });

  const router = useRouter();
  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      const gruposData = await fetchGrupoId(id);
      const voluntariosData = await voluntarios(query);
      const pacienteData = await pacientes(query);

      setGrupo({
        ...gruposData,
        voluntario_id: gruposData.Voluntarios.map(v => v.voluntario_id),
      });
      setVoluntariosData(voluntariosData);
      setVoluntario1(gruposData.Voluntarios[0]);
      setVoluntario2(gruposData.Voluntarios[1]);
      setVoluntario3(gruposData.Voluntarios[2]);
      setPacientesData(pacienteData);
    }
    fetchData();
  }, [id, query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'activo') {
      const boolValue = JSON.parse(value);
      setGrupo((prevData) => ({
        ...prevData,
        activo: boolValue,
      }));
    } else {
      setGrupo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
          const response = await fetch(`${URL}/grupo/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(grupoToSubmit),
          });

          if (response.ok) {
            Swal.fire({
              text: 'Grupo actualizado correctamente',
              icon: 'success',
              confirmButtonColor: 'gray',
              color: 'black',
            }).then(() => router.push('/grupos'));

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

  // Filtrar voluntarios para que no se repitan
  const getFilteredVoluntarios = (currentVoluntarioId) => {
    const selectedVoluntariosIds = [
      voluntario1?.voluntario_id,
      voluntario2?.voluntario_id,
      voluntario3?.voluntario_id,
    ].filter(id => id !== currentVoluntarioId && id !== undefined);

    return voluntariosData.filter(voluntario => !selectedVoluntariosIds.includes(voluntario.voluntario_id));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col align-middle justify-center items-center gap-2 bg-gray-100"
    >
      <h1 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Editar grupo
      </h1>

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
                {pacientesData?.map((p) => (
                  <option value={p.paciente_id} key={p.paciente_id}>
                    {capitalizeFirstLetterOfEachWord(`${p.nombre} ${p.apellido}`)}
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

            <div className="col-span-1">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripción
              </label>
              <textarea
                name="descripcion"
                // required
                value={grupo.descripcion}
                onChange={handleChange}
                rows="2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>

   
          </div>
        </div>

        <div className="p-4 max-w-md shadow-lg rounded-lg">
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1">
              <label
                htmlFor="diaSemana"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Día de la semana
              </label>
              <select
                name="diaSemana"
                required
                value={grupo.diaSemana}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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

            <div className="col-span-1">
              <label
                htmlFor="fechaDeInicio"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha de inicio
              </label>
              <input
                name="fechaDeInicio"
                required
                value={grupo.fechaDeInicio}
                onChange={handleChange}
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="activo"
              >
                Está activo?
              </label>
              <select
                name="activo"
                required
                value={grupo.activo}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="">Elegir opción</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>


          </div>
        </div>
      </div>

      <button
        type="submit"
        className="m-4 p-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-700"
      >
        Enviar
      </button>
    </form>
  );
}

export default EditarGrupo;
