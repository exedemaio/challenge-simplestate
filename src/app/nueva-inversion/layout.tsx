"use client";
import React from "react";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <nav className="flex items-center justify-between w-full p-4 bg-gray-200">
        <div className="flex items-center xl:ml-[130px]">
          <Image src="/logo.svg" alt="Logo" width={200} height={30} />
        </div>
      </nav>
      <div className="flex flex-col h-screen bg-grey-100 lg:px-0 px-6">
        <div className="max-w-[930px] mx-auto w-full">
          <div onClick={() => console.log("volver")} className="md:mt-[45px] mt-[30px] gap-2 text-sm flex items-center justify-start text-black hover:text-gray-700 cursor-pointer" >
            <Image src="/chevron.svg" alt="back" width={5} height={8} />
            <span>Volver</span>
          </div>
          <h1 className="text-xl font-semibold mt-6 md:mb-8 mb-6">Nueva inversión</h1>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
