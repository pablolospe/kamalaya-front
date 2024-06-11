'use client';

import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { seguimientos } from '@/utils/fetchSeguimientos';
import Link from 'next/link'
import { LuEdit } from 'react-icons/lu';
import { formatearFecha, capitalizeFirstLetterOfEachWord } from '@/utils/formats';


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

  return (
    <section className="flex flex-col gap-2 overflow-auto">
      <table className='text-sm'>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-1" >ID</th>
            <th className="border p-1" >Voluntarios</th>
            <th className="border p-1" >Fecha/Hora</th>
            <th className="border p-1" >Evolución</th>
            <th className="border p-1" >Problemas actuales y/o necesidades</th>
            <th className="border p-1" >ECOG</th>
            <th className="border p-1 text-xs" >Llamada o <br/> visita</th>
            <th className="border p-1" >Editar</th>
          </tr>
        </thead>


        <tbody className='text-xs'>
          {seguimientosData?.map((g) => (
            <tr key={g.seguimiento_id}
              className="text-center bg-gray-100 hover:bg-gray-200"
            >
              <td className="table-cell p-0">{g.seguimiento_id}</td>
              <td className="table-cell p-0">
              {capitalizeFirstLetterOfEachWord(`${g?.Voluntarios[0]?.nombre} ${g.Voluntarios[0]?.apellido}`)} <br/>
                {g?.Voluntarios[1]?.nombre} {g.Voluntarios[1]?.apellido} <br/>
                {g?.Voluntarios[2]?.nombre} {g.Voluntarios[2]?.apellido}
              </td>
              
              <td className="table-cell p-0">
                {formatearFecha(g?.fecha)} <hr />
                {g?.horaInicio} a {g?.horaFin}
              </td>

              <td className="table-cell p-0">{g?.evolucion}</td>
              <td className="table-cell p-0">{g?.problemasActualesYNecesidades}</td>
              <td className="table-cell p-0 text-sm">{g?.ECOG}</td>
              <td className="table-cell p-0 text-sm">{g?.llamadaOVisita}</td>
              <td className="flex justify-center items-center">
                <div className="bg-gray-300 hover:bg-gray-400 cursor-pointer p-3 my-1 gap-3 w-11 rounded-lg self-center">
                  <Link href={`/pacientes/${g?.paciente_id}/seguimiento/${g?.seguimiento_id}`}>
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
