import React from 'react'
import { Button, Avatar, } from "@material-tailwind/react";
import { SidebarWithCta } from './SidebarWithCta';
import { SidebarWithBurgerMenu } from '../SidebarWithBurgerMenu'
import user from '../../img/user.svg'
import { AvatarWithUserDropdown } from '../AvatarWithUserDropdown';
const PatientLayout = ({ children }) => {
  return (
    <div className='w-full'>
      <div className="hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#A1C398] lg:flex xl:w-[15%] lg:flex-col lg:fixed lg_inset-y-0">
        {/*sidebar */}
        <SidebarWithCta />

      </div>
      <main className="md:pl-56 xl:pl-[15%] pb-0 h-screen overflow-y-auto bg-[#FEFDED]">
        <div className='w-full h-12  flex flex-row justify-between bg-[#FA7070] text-base lg:text-lg xl:text-xl 2xl:text-2xl overflow-y-auto'>
          <SidebarWithBurgerMenu />
          <div className='w-full flex justify-end'>
            <AvatarWithUserDropdown />
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
