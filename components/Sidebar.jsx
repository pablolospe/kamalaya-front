// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// import { LuUsers, LuUserPlus, LuUser } from 'react-icons/lu';
// import AppBar from '@/app/auth/AppBar';

// function Sidebar({ children }) {
//   return (
//     <div className="flex">
//       <div className="fixed h-20 w-screen p-4 bg-white flex flex-row justify-between z-20">
//         <div className="flex flex-row gap-2 mr-2 items-center ">
//           <Link href="/">
//             <div className="bg-gray-200 text-black text-xs text-center py-2 px-4 rounded-lg inline-block hover:bg-gray-300 shadow-2xl">
//               <Image
//                 src="/logoKamalaya.svg"
//                 alt="isotipo kamalaya"
//                 width={150}
//                 height={150}
//                 priority={false}
//               />
//               home
//             </div>
//           </Link>

//           <span className=" border-gray-200 w-full p-2"></span>

//           <Link href="/voluntarios">
//             <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//               {/* <RxDashboard size={20} /> */}
//               <LuUsers size={20} />
//             </div>
//           </Link>
//           <Link href="/ingreso">
//             <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//               <LuUserPlus size={20} />
//             </div>
//           </Link>
//           <Link href="/pacientes">
//             <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//               {/* <RxDashboard size={20} /> */}
//               <LuUser size={20} />
//             </div>
//           </Link>
//           <Link href="/ingreso/paciente">
//             <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//               <LuUserPlus size={20} />
//             </div>
//           </Link>
//           <Link href="/grupos">
//             <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//               <LuUsers size={20} />
//             </div>
//           </Link>
//         </div>
//           <AppBar />
//       </div>
//       <main className="ml-20 w-full">{children}</main>
//     </div>
//   );
// }

// export default Sidebar;

'use client';

import AppBar from '@/app/auth/AppBar';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

const links = [
  // {
  //   label: 'Home',
  //   route: '/',
  // },
  {
    label: 'voluntarios',
    route: '/voluntarios',
  },
  {
    label: 'pacientes',
    route: '/pacientes',
  },
  {
    label: 'ingreso voluntario',
    route: '/ingreso',
  },
  {
    label: 'ingreso paciente',
    route: '/ingreso/paciente',
  },
  {
    label: 'grupos',
    route: '/grupos',
  },
];

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Línea antes de la barra de navegación */}
      <div
        className={`fixed top-0 z-50 flex 
        
        items-center 
        justify-between 
        w-full bg-gray-200  ${
          isMenuOpen
            ? 'transition-all duration-500 ease-in h-[12rem]'
            : 'transition-all duration-700 ease-in h-16'
        }`}
      >
        <div>
          <NextImage
            src="/logoKamalaya.svg"
            alt="isotipo kamalaya"
            width={40}
            height={40}
            className={`hidden md:block ml-6 transition-transform duration-700 ${
              isMenuOpen ? 'translate-y-1' : ''
            }`}
            style={{
              transformOrigin: 'center bottom', // Set transform origin to center bottom
            }}
          />
        </div>

        {/* Navegación */}
        <button
          className={`hamburger md:invisible focus:outline-none ${
            isMenuOpen ? 'mr-0' : 'mr-6'
          }`}
          onClick={handleMenuToggle}
        >
          <div
            className={`h-0.5 w-4 bg-black transition ease-in-out duration-700 ${
              isMenuOpen ? 'rotate-45 translate-y' : ''
            }`}
          ></div>
          <div
            className={`h-0.5 w-4 bg-black mt-1 mb-1 transition ease-in-out duration-700 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`h-0.5 w-4 bg-black transition ease-in-out duration-700 ${
              isMenuOpen ? '-rotate-45 -translate-y' : ''
            }`}
          ></div>
        </button>

        <ul
          className={`md:flex md:gap-6 md:mr-12 ${
            isMenuOpen ? 'flex flex-col gap-4 mr-2' : 'hidden'
          }`}
        >
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>
                <div
                  className="text-gray-700 text-center font-light hover:text-black"
                  style={{
                    textShadow:
                      '0 0 10px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="hidden lg:block fixed left-32 text-gray-700 font-light text-xl hover:text-black">
          <Link href={'/'}>Kamalaya</Link>
        </h1>
        <div className='hidden md:block'>
          <AppBar />
        </div>
      </div>
      {/* Línea después de la barra de navegación */}
      {/* <div className="w-full bg-rojo h-1 relative bottom-[-10px] hidden md:block bg-opacity-70 z-10"></div> */}
    </>
  );
}

export default Sidebar;
