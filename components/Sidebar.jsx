import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { FiSettings, FiEdit } from 'react-icons/fi';

function Sidebar({ children }) {
  return (
    <div className="flex">
      <div className="fixed h-20 w-screen p-4 bg-white border-r-[1px] flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Link href="/">
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
              {/* <RxSketchLogo size={20} /> */}
              <RxSketchLogo size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/voluntarios">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              {/* <RxDashboard size={20} /> */}
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href="/ingreso">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              {/* <RxPerson size={20} /> */}
              <RxPerson size={20} />
            </div>
          </Link>
          {/* <Link href="/">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              
              <FiEdit size={20} />
            </div>
          </Link> */}
          <Link href="/configuracion">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
}

export default Sidebar;
