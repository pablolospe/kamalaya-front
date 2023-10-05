import Image from 'next/image';
import Link from 'next/link';
import { LuUsers, LuUserPlus, LuUser } from 'react-icons/lu';
export default function Home() {
  return (
    <main className="mt-20 flex flex-row justify-evenly align-center">
      <div className="flex flex-col gap-10 justify-center">

        <Link href="/voluntarios" className="flex flex-row items-center w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 shadow-2xl">
          <span>Ver todos los voluntarios</span>
          <LuUsers size={40} />
        </Link>

        <Link href="/ingreso" className="flex flex-row items-center w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 shadow-2xl">
          <span>Ingresar un nuevo voluntario</span>
          <LuUserPlus size={45} />
        </Link>

        <Link href="/pacientes" className="flex flex-row items-center w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 shadow-2xl">
          <span>Ver todos los pacientes</span>
          <LuUser size={40} />
        </Link>

        <Link href="/ingreso/paciente" className="flex flex-row items-center w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 shadow-2xl">
          <span>Ingresar un nuevo paciente</span>
          <LuUserPlus size={45} />
        </Link>

        {/* <button className="w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">
          Algo más
        </button> */}
      </div>
      <div className="hidden md:block self-center rounded-2xl top-20 right-20 max-h-80 p-10 bg-slate-100">
        <Image
          className='bg-slate-100'
          src="/logoKamalaya.svg"
          width={250}
          height={250}
          alt="Foto logo kamalaya"
        />
      </div>
    </main>
  );
}

// https://www.youtube.com/watch?v=KpGZjrrS3pY
{/* <div className="bg-gray-200 text-black text-xs text-center py-2 px-4 rounded-lg inline-block hover:bg-gray-300 shadow-2xl">  
<Image
  src="/logoKamalaya.svg"
  width={150}
  height={150}
  priority={false}
  alt="isotipo kamalaya"
/>
home
</div> */}