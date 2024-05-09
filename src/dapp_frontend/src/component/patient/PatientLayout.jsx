import React from 'react'
import { Button, Avatar, } from "@material-tailwind/react";
import { SidebarWithCta } from './SidebarWithCta';
import { SidebarWithBurgerMenu } from '../SidebarWithBurgerMenu'
import user from '../../img/user.svg'
const PatientLayout = ({ children }) => {
  return (
    <div className='w-full'>
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed z-[80]  lg:flex  lg:flex-col lg:fixed bg-[#B5C0D0] ">
        {/*sidebar */}
        <SidebarWithCta />

      </div>
      <main className="md:pl-64  pb-0 h-screen overflow-y-auto bg-[#FEFDED]">
        <div className='w-full h-12  flex flex-row justify-between bg-[#FA7070]'>
          <SidebarWithBurgerMenu />
          <div className='w-full flex justify-end'>
            <Avatar src={user} />
          </div>
        </div>
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
