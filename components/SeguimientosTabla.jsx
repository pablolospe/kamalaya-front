'use client';

import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { seguimientos } from '@/utils/fetchSeguimientos';
import Link from 'next/link'
import { LuUser, LuEdit } from 'react-icons/lu';
import { formatearFecha } from '@/utils/formats';


function SeguimientosTabla({ id }) {
  const [seguimientosData, setSeguimientosData] = useState([]);

  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

console.log(seguimientosData);

  useEffect(() => {
    async function fetchData() {
      // if (session) {
      const seguimientosData = await seguimientos(id, query);
      
      setSeguimientosData(seguimientosData);
      // }
    }
    fetchData();
  }, [query]);

  // console.log(seguimientosData);
  return (
      <section className="flex flex-col gap-2 overflow-auto">
        <table className='text-sm'>
          <thead>
            <tr className="bg-gray-100 row-auto">
              <th className="border p-2" >ID</th>
              {/* <th className="border p-2" >Paciente</th> */}
              <th className="border p-2" >Voluntario 1</th>
              <th className="border p-2" >Voluntario 2</th>
              <th className="border p-2" >Voluntario 3</th>
              <th className="border p-2" >Fecha</th>
              <th className="border p-2" >Hora de inicio</th>
              <th className="border p-2" >Hora de finalización</th>
              <th className="border p-2" >Evolución</th>
              <th className="border p-2" >Problemas actuales y/o necesidades</th>
              <th className="border p-2" >ECOG</th>
              <th className="border p-2" >Llamada o visita</th>
              <th className="border p-2" >Editar</th>
            </tr>
          </thead>


          <tbody>
            {seguimientosData?.map((g) => (
              <tr key={g.seguimiento_id} 
              className="text-center bg-gray-100 hover:bg-gray-200"
              >
                <td className="table-cell p-2">{g.seguimiento_id}</td>
                {/* <td className="table-cell p-2">{g.Paciente.nombre} {g.Paciente.apellido}</td> */}
                <td className="table-cell p-2">{g?.Voluntarios[0]?.nombre} {g.Voluntarios[0]?.apellido}</td>
                <td className="table-cell p-2">{g?.Voluntarios[1]?.nombre} {g.Voluntarios[1]?.apellido}</td>
                <td className="table-cell p-2">{g?.Voluntarios[2]?.nombre} {g.Voluntarios[2]?.apellido}</td>
                
                <td className="table-cell p-2">{formatearFecha(g.fecha)}</td>
                <td className="table-cell p-2">{g.horaInicio}</td>
                <td className="table-cell p-2">{g.horaFin}</td>
                <td className="table-cell p-2">{g.evolucion}</td>
                <td className="table-cell p-2">{g.problemasActualesYNecesidades}</td>
                <td className="table-cell p-2">{g.ECOG}</td>
                <td className="table-cell p-2">{g.llamadaOVisita}</td>
                <td className="flex justify-center items-center">
                  <div className="bg-gray-300 hover:bg-gray-400 cursor-pointer p-3 my-1 gap-3 w-11 rounded-lg self-center">
                    <Link href={`/pacientes/${g.paciente_id}/seguimiento/${g.seguimiento_id}`}>
                      <LuEdit size={20} />
                    </Link>
                  </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    
  );
}

export default SeguimientosTabla;
