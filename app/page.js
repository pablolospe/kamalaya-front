import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="mt-20 flex flex-row justify-evenly align-center">
      <div className="flex flex-col gap-10 justify-center">

        <Link href="/voluntarios" className="w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 shadow-2xl">
          Ver todos los voluntarios
        </Link>

        <Link href="/ingreso" className="w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 shadow-2xl">
          Ingresar un nuevo voluntario
        </Link>

        {/* <button className="w-40 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">
          Algo más
        </button> */}
      </div>
      <div className="hidden md:block top-20 right-20 max-h-80 ">
        <Image
          className='rounded-xl shadow-2xl'
          src="/fotoFlor.jpg"
          width={650}
          height={650}
          alt="Foto mano kamalaya"
        />
      </div>
    </main>
  );
}

// https://www.youtube.com/watch?v=KpGZjrrS3pY
