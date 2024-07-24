import React, { useEffect, useState } from "react";

import {
  Spinner,
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import { SidebarWithCta } from "./patient/SidebarWithCta";
import user from "../img/user.svg";
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";

import { useAuth } from "../context/use-auth-client";

import { ToastContainer, toast, Bounce } from "react-toastify";

import {
  PlusIcon,
  HomeIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";

const Fandq = () => {
  const { member, membertype, logout, isMember, whoamiActor } = useAuth();
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
    prescriber: "",
  });

  useEffect(() => {
    if (isMember) {
      const getdata = async () => {
        const result = await whoamiActor.getMedicationList();
        console.log(result.ok);
        if ("ok" in result) {
          setMedications(result.ok);
          console.log(result.ok);
        }
      };
      getdata();
    }
  }, [member]);

  const handleUpdate = async () => {
    // Handle the update logic here
    setIsprocess(true);
    const result = await whoamiActor.addMedication(med);
    if ("ok" in result) {
      toast.success("🦄 Updated successfully!", {
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
      toast.error("Something wrong try again later!", {
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
    const result = await whoamiActor.deleteMedicationAtIndex(index);
    console.log("result = ", result);
    if ("ok" in result) {
      toast.success("🦄 deleted successfully!", {
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
      }, 2000);
    } else {
      toast.error("Something wrong try again later!", {
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

  const deleteMed = async (index) => {
    const newMeds = [...medications];
    newMeds.splice(index, 1);
    setMedications(newMeds);
    const result = await whoamiActor.deleteMedicationAtIndex(index);
    console.log("indes", index);
  };

  return (
    <div className="w-full">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed z-[80]  lg:flex  lg:flex-col lg:fixed bg-[#B5C0D0] ">
        {/*sidebar */}
        <SidebarWithCta />
      </div>
      <main className="md:pl-64  pb-0 h-screen overflow-y-auto bg-[#FEFDED]">
        <div className="w-full h-12  flex flex-row justify-between bg-[#AAD7D9]">
          <SidebarWithBurgerMenu />
          <div className="w-full flex justify-end">
            <Avatar src={user} />
          </div>
        </div>
        {/*Navbar */}
        <div
          className="flex justify-center items-center "
          style={{ height: "calc(100vh - 3rem)" }}
        >
          {/*main content childrend */}
          <div className="w-full h-full"></div>
        </div>
      </main>
    </div>
  );
};

export default Fandq;
