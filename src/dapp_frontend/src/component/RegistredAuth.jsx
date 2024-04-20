import { useEffect, useState } from "react"
import { dapp_backend } from "../../../declarations/dapp_backend";
import { useAuth } from "../context/use-auth-client";
import { Outlet } from 'react-router-dom'
import Register from "./Register";

const RegistredAuth = () => {
  const { principal, isMember, membertype, loading } = useAuth();
  const [result, setResult] = useState();


  useEffect(() => {
    // console.log("member type is:", membertype);
    // fetchdata();
  }, [])

  // async function fetchdata() {
  //   const result = await dapp_backend.whoami();
  //   const ll = await dapp_backend.getMember();
  //   setResult(ll);
  //   setLoading(false);
  //   console.log("resutlt is +000", result, ll);
  //   console.log("principal:", principal);
  // }
  // if (loading) {
  //   return <div className="flex items-center justify-center"><p className="font-bold text-black text-xl">Loading...</p></div>;
  // }
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
