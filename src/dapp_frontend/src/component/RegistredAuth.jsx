import { useEffect, useState } from "react"
import { dapp_backend } from "../../../declarations/dapp_backend";
import { useAuth } from "../context/use-auth-client";
import { Outlet } from 'react-router-dom'
import Register from "./Register";

const RegistredAuth = () => {
  const { principal, isMember, membertype, loading } = useAuth();
  const [result, setResult] = useState();


  useEffect(() => {
  }, [])


  if (loading) {
    return (<div className="flex justify-center items-center">
      <p>Loading the items</p>
    </div>)
  }

  return (
    <>
      {
        isMember ? <Outlet /> : <Register />
      }
    </>
  )
}

export default RegistredAuth
