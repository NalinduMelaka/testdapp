import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Spinner, Avatar,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,

} from "@material-tailwind/react";
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { useAuth } from '../../context/use-auth-client';
import { dapp_backend } from '../../../../declarations/dapp_backend';
import {
  PlusIcon,
  HomeIcon,
  FolderPlusIcon
} from "@heroicons/react/24/outline";
const PMedications = () => {
  const { member, membertype, logout, isMember } = useAuth();
  const [isprocess, setIsprocess] = useState(false);


  //for the medications
  const [medications, setMedications] = useState([]);
  const [med, setMed] = useState({
    drugname: "",
    status: "",
    dose: "",
    note: "",
    reason: "",
    picture: "",
    prescriber: ""
  })

  useEffect(() => {
    if (isMember) {
      const getdata = async () => {
        const result = await dapp_backend.getMedicationList();
        console.log(result.ok);
        if ('ok' in result) {
          setMedications(result.ok);
          console.log(result.ok);
        }
      }
      getdata();
    }
  }, [member]);


  const handleUpdate = async () => {
    // Handle the update logic here
    setIsprocess(true);
    const result = await dapp_backend.addMedication(med);
    if ('ok' in result) {
      toast.success('🦄 Updated successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsprocess(false);
    } else {
      toast.error('Something wrong try again later!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsprocess(false);
    }
  };

  const hancledelte = async (index) => {
    //delete medicatoin
    const newMeds = [...medications];
    newMeds.splice(index, 1);
    setMedications(newMeds);
    const result = await dapp_backend.deleteMedicationAtIndex(index);
    console.log("result = ", result);
    if ('ok' in result) {
      toast.success('🦄 deleted successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsprocess(false);
      setTimeout(() => {
        logout();
      }, 2000)
    } else {
      toast.error('Something wrong try again later!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsprocess(false);
    }
  }


  const deleteMed = async (index) => {
    const newMeds = [...medications];
    newMeds.splice(index, 1);
    setMedications(newMeds);
    const result = await dapp_backend.deleteMedicationAtIndex(index);
    console.log("indes", index);
  };
  return (
    <div className='w-full h-full p-4'>
      <div className='flex flex-row'><p className='font-bold text-xl mt-4 ml-2'>Medications </p>
        <div className='absolute top-14 right-4'>
          <SpeedDial placement="top">
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction>
                <Link to={`/patient/medications/new`}>
                  <FolderPlusIcon className="h-5 w-5" />
                </Link>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
      <ToastContainer />

      <div>
        <table className='w-2/3 mt-8'>
          <thead className='w-full'>
            <tr className='flex justify-between'>
              <th>Drug Name</th>
              <th>Status</th>
              <th>Dose</th>
              <th>Note</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {medications?.map((med, index) => (
              <tr key={index} className='flex justify-between mx-2'>
                <td>{med.drugname}</td>
                <td>{med.status}</td>
                <td>{med.dose}</td>
                <td>{med.note}</td>
                <td>{med.reason}</td>
                <td>
                  <button onClick={() => hancledelte(index)} className='bg-red-400 p-1 rounded-md text-white font-normal'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default PMedications
