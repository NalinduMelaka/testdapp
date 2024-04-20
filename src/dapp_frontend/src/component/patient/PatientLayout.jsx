import React from 'react'
import { Button } from "@material-tailwind/react";
import { SidebarWithCta } from './SidebarWithCta';

const PatientLayout = ({ children }) => {
  return (
    <div className='w-full'>
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed z-[80]  lg:flex  lg:flex-col lg:fixed ">
        {/*sidebar */}
        <SidebarWithCta />
      </div>
      <main className="md:pl-64  pb-0 h-screen overflow-y-auto bg-[#FEFDED]">
        <div className='bg-black w-full h-9'></div>
        {/*Navbar */}
        <div className='flex justify-center items-center ' style={{ height: 'calc(100vh - 3rem)' }}>
          {/*main content childrend */}
          {children}
        </div>
      </main>
    </div>
  )
}

export default PatientLayout
