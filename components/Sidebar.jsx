'use client';

import AppBar from '@/app/auth/AppBar';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useSession } from 'next-auth/react';

const linksAdmin = [
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

const linksUser = [
  {
    label: 'voluntarios',
    route: '/voluntarios',
  },
  {
    label: 'pacientes',
    route: '/pacientes',
  },
  {
    label: 'ingreso paciente',
    route: '/ingreso/paciente',
  },
];

function Sidebar() {
  const { data: session, status } = useSession();

  console.log({ session, status });
  const state = session?.user?.role
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
        bg-opacity-70
        w-full bg-white  ${
          isMenuOpen
            ? 'transition-all duration-500 ease-in h-[12rem]'
            : 'transition-all duration-700 ease-in h-16'
        }`}
      >
        <div>
          <div className="hidden lg:flex flex-row gap-2 justify-center items-center">
            <NextImage
              src="/logoKamalaya.svg"
              alt="isotipo kamalaya"
              width={40}
              height={40}
              className={`ml-6 transition-transform duration-700 ${
                isMenuOpen ? 'translate-y-1' : ''
              }`}
              style={{
                transformOrigin: 'center bottom', // Set transform origin to center bottom
              }}
            />

            <h1 className="text-gray-700 font-light text-2xl hover:text-black">
              <Link href={'/'}>Kamalaya</Link>
            </h1>
          </div>
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
          {( state === 'Admin' ? linksAdmin : linksUser
          ).map(({ label, route }) => (
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

        <div className="hidden md:block">
          <AppBar />
        </div>
      </div>
      {/* Línea después de la barra de navegación */}
      {/* <div className="w-full bg-rojo h-1 relative bottom-[-10px] hidden md:block bg-opacity-70 z-10"></div> */}
    </>
  );
}

export default Sidebar;
