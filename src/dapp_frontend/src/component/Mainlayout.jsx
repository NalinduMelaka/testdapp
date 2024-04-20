import { useEffect, useState } from "react"
import { dapp_backend } from "../../../declarations/dapp_backend";
import { useAuth } from "../context/use-auth-client";
import { Outlet } from 'react-router-dom'
import PatientLayout from "./patient/PatientLayout";
import DoctorLayout from "./doctor/DoctorLayout";
import PharmacistLayout from "./pharmacist/PharmacistLayout";

const Mainlayout = () => {
  const { membertype } = useAuth();

  const getLayout = (membertype) => {
    switch (membertype) {
      case "patient":
        return <PatientLayout><Outlet /></PatientLayout>;
      case "doctor":
        return <DoctorLayout><Outlet /></DoctorLayout>;
      case "pharma":
        return <PharmacistLayout><Outlet /></PharmacistLayout>;
      default:
        return <div>No layout found for this user type</div>;
    }
  };

  return (
    <>
      {getLayout(membertype)}
    </>
  )
}

export default Mainlayout
