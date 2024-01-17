'use client';
import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { pacientes } from '@/utils/fetchPacientes';
import Swal from 'sweetalert2';

function CrearSeguimiento({ params }) {
  const { id } = params;
  // console.log(params);
  const [voluntario1, setVoluntario1] = useState('');
  const [voluntario2, setVoluntario2] = useState('');
  const [voluntario3, setVoluntario3] = useState('');
  // const [pacientesData, setPacientesData] = useState([]);
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
      const voluntariosData = await voluntarios(query);

      setVoluntariosData(voluntariosData);
    }
    fetchData();
  }, [query, setVoluntariosData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeguimiento((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handlePacienteChange = (e) => {
  //   setSeguimiento((prevSeguimiento) => ({
  //     ...prevSeguimiento,
  //     paciente_id: Number(e.target.value),
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVoluntarioId = [voluntario1, voluntario2, voluntario3].filter(
      (voluntario) => voluntario !== ''
    );

    const seguimientoToSubmit = {
      ...seguimiento,
      voluntario_id: updatedVoluntarioId,
    };

    try {
      const response = await fetch(`${URL}/seguimiento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seguimientoToSubmit),
      });

      if (response.ok) {
        Swal.fire({
          text: 'Seguimiento ingresado correctamente',
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
        Crear nuevo seguimiento
      </h1>

      <div className="flex flex-col md:flex-row justify-evenly align-center max-w-xl gap-8">
        <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
          <div className="flex flex-col justify-evenly align-center max-w-xl gap-4">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="fechaInicio"
            >
              Fecha
            </label>
            <input
              name="fecha"
              required
              value={seguimiento.fecha}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="date"
              id="fecha"
            ></input>

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
                value={seguimiento.horaInicio}
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
                value={seguimiento.horaFin}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="date"
                id="horaFin"
                min={seguimiento.horaInicio}
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
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="horaFin"
              >
                Llamada o visita
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
                <option value="">Seleccione una opción</option>
                <option value="llamada">llamada</option>
                <option value="visita">visita</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Evolución
              </label>
              <textarea
                required
                name="evolucion"
                value={seguimiento.evolucion}
                onChange={handleChange}
                id="evolucion"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Describe la evolucion del paciente"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Problemas actuales y/o necesidades
              </label>
              <textarea
                name="problemasActualesYNecesidades"
                value={seguimiento.problemasActualesYNecesidades}
                onChange={handleChange}
                id="problemasActualesYNecesidades"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Describe la problemas actuales y/o las necesidades del paciente"
              ></textarea>
            </div>

            <label>
              ECOG
              <select
                name="ECOG"
                value={seguimiento.ECOG}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">Elige un valor</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

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
            </div>

            <button
              type="submit"
              className="mt-4 py-2 px-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Enviar formulario
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CrearSeguimiento;
