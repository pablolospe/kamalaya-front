'use client';
import { URL } from '@/config';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { pacientes } from '@/utils/fetchPacientes';
import { grupos } from '@/utils/fetchGrupos';

function CrearGrupo() {
  // const { data: session } = useSession();
  const [gruposData, setGruposData] = useState([]);
  const [pacientesData, setPacientesData] = useState([]);
  const [voluntariosData, setVoluntariosData] = useState([]);
  const [grupo, setGrupo] = useState({
    diaSemana: '',
    fechaDeInicio: '',
    horaInicio: '',
    horaFin: '',
    paciente_id: '',
    voluntario_id: [1, 2],
    descripcion: '',
  });

  const router = useRouter();
  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      // if (session) {
      const gruposData = await grupos(query);
      const pacienteData = await pacientes(query);
      const voluntariosData = await voluntarios(query);
      setGruposData(gruposData);
      setPacientesData(pacienteData);
      setVoluntariosData(voluntariosData);
      // }
    }
    fetchData();
  }, [query, setGrupo, setVoluntariosData]);

  console.log(gruposData);

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
    const formDataJSON = JSON.stringify(grupo);
    console.log(formDataJSON);

    try {
      const response = await fetch(`${URL}/grupo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(grupo),
      });

      if (response.ok) {
        Swal.fire({
          text: 'Formulario ingresado correctamente',
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
  };
  // const handleVoluntarioChange = (e) => {
  //   setGrupo((prevGrupo) => ({
  //     ...prevGrupo,
  //     voluntario_id: [...prevGrupo.voluntario_id, e.target.value]
  //   }));
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-32 flex flex-row justify-evenly align-center max-w-xl">
        <div className=" flex flex-col justify-evenly align-center max-w-xl">
          <h1>Crear nuevo grupo</h1>
          <br />
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

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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

          {/* 
      <label>Elige un voluntario</label>
      <select
        onChange={handleVoluntarioChange}
        value={grupo.voluntario_id}  
        name=""
        id=""
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
      >
          <option> Elije un voluntario </option>
        {voluntariosData?.map((p) => (
          <option key={p.voluntario_id}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select> */}

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="horaInicio"
            >
              Hora de inicio:
            </label>
            <select
              name="horaInicio"
              required
              value={grupo.horaInicio}
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="horaFin"
            >
              Hora de fin:
            </label>
            <select
              name="horaFin"
              required
              value={grupo.horaFin}
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
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="descripcion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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

        <div>
          <section>
            <p>Paciente: {grupo.paciente_id}</p>
            <p>Día de la semana: {grupo.diaSemana}</p>
            <p>Fecha de inicio: {grupo.fechaDeInicio}</p>
            <p>Hora de inicio: {grupo.horaInicio}</p>
            <p>Hora de finalización: {grupo.horaFin}</p>
          </section>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-40 mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enviar formulario
        </button>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th className="border p-2" >ID</th>
              <th className="border p-2" >Paciente</th>
              <th className="border p-2" >Voluntario</th>
              <th className="border p-2" >Fecha de inicio</th>
              <th className="border p-2" >Hora de inicio</th>
              <th className="border p-2" >Hora de finalización</th>
              <th className="border p-2" >Día de la semana</th>
              <th className="border p-2" >Descripción</th>
            </tr>
          </thead>
          <tbody>
            {gruposData?.map((g) => (
              <tr key={g.grupo_id} 
              className="text-center bg-gray-100 hover:bg-gray-200"
              >
                <td className="hidden md:table-cell">{g.grupo_id}</td>
                <td className="hidden md:table-cell">{g.paciente_id}</td>
                <td className="hidden md:table-cell">{g?.voluntario_id}</td>
                <td className="hidden md:table-cell">{g.fechaDeInicio}</td>
                <td className="hidden md:table-cell">{g.horaInicio}</td>
                <td className="hidden md:table-cell">{g.horaFin}</td>
                <td className="hidden md:table-cell">{g.diaSemana}</td>
                <td className="hidden md:table-cell">{g.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </form>
  );
}

export default CrearGrupo;
