import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/use-auth-client'
import { useEffect, useState } from "react"

const DAuth = () => {
  const { membertype } = useAuth();

  return (
    <>
      {
        (membertype == "doctor") ? <Outlet /> : <div className='flex justify-center items-center h-screen w-full'><p>You don't have access for this level!</p></div>
      }
    </>
  )
}

export default DAuth
