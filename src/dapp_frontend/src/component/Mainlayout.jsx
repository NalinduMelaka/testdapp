import { useEffect, useState } from "react";
import { useAuth } from "../context/use-auth-client";
import { Link, Outlet } from "react-router-dom";
import PatientLayout from "./patient/PatientLayout";
import DoctorLayout from "./doctor/DoctorLayout";
import PharmacistLayout from "./pharmacist/PharmacistLayout";
import APILayout from "./APIuser/APILayout";

const Mainlayout = () => {
  const { membertype } = useAuth();

  const getLayout = (membertype) => {
    switch (membertype) {
      case "patient":
        return (
          <PatientLayout>
            <Outlet />
          </PatientLayout>
        );
      case "doctor":
        return (
          <DoctorLayout>
            <Outlet />
          </DoctorLayout>
        );
      case "pharma":
        return (
          <PharmacistLayout>
            <Outlet />
          </PharmacistLayout>
        );
      case "apiuser":
        return (
          <APILayout>
            <Outlet />
          </APILayout>
        );
      default:
        return (
          <div className="w-screen h-screen flex flex-col justify-center items-center text-red-500  bg-stone-600">
            <p className="text-2xl">
              Unrecognizable user. Please contact the help center!
            </p>
            <Link to="/">
              <button className="mt-4 p-1 rounded-md text-sm bg-black w-44 text-white font-bold">
                Go back to home.
              </button>
            </Link>
          </div>
        );
    }
  };

  return <>{getLayout(membertype)}</>;
};

export default Mainlayout;
