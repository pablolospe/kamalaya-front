import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { LuUsers, LuUserPlus } from 'react-icons/lu';


function Sidebar({ children }) {
  return (
    <div className="flex">
      <div className="fixed h-20 w-screen p-4 bg-white flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center ">
          <Link href="/">
            <div className="bg-gray-200 text-black text-xs text-center py-2 px-4 rounded-lg inline-block">  
              <Image
                src="/logoKamalaya.svg"
                width={150}
                height={150}
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
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
}

export default Sidebar;
