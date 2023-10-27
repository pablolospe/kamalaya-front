import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { LuUsers, LuUserPlus, LuUser } from 'react-icons/lu';
import AppBar from '@/app/auth/AppBar';



function Sidebar({ children }) {
  return (
    <div className="flex">
      <div className="fixed h-20 w-screen p-4 bg-white flex flex-row justify-between z-20">
        <div className="flex flex-row gap-2 mr-2 items-center ">
          <Link href="/">
            <div className="bg-gray-200 text-black text-xs text-center py-2 px-4 rounded-lg inline-block hover:bg-gray-300 shadow-2xl">  
              <Image
                src="/logoKamalaya.svg"
                width={150}
                height={150}
                priority={false}
                alt="isotipo kamalaya"
              />
              home
            </div>
          </Link>

          
          <span className=" border-gray-200 w-full p-2"></span>
          
          <Link href="/voluntarios">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              {/* <RxDashboard size={20} /> */}
              <LuUsers size={20} />
            </div>
          </Link>
          <Link href="/ingreso">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <LuUserPlus size={20} />
            </div>
          </Link>
          <Link href="/pacientes">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              {/* <RxDashboard size={20} /> */}
              <LuUser size={20} />
            </div>
          </Link>
          <Link href="/ingreso/paciente">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <LuUserPlus size={20} />
            </div>
          </Link>
          <Link href="/grupos">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <LuUsers size={20} />
            </div>
          </Link>
        </div>
          <AppBar />
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
}

export default Sidebar;

