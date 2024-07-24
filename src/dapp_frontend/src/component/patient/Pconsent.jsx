import React from "react";
import { BookCheck } from "lucide-react";
import { Card, Typography, Button, Switch } from "@material-tailwind/react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Pconsent = () => {
  const onSubmit = async () => {
    console.log("this is data");
  };
  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">Consent Management Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <BookCheck size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Consent List
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="mx-16 flex flex-col gap-4">
        <div className="flex flex-row w-full justify-between">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Prescription
          </Typography>
          <Switch color="blue" defaultChecked />
        </div>
        <div className="flex flex-row w-full justify-between">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Medication
          </Typography>
          <Switch color="blue" defaultChecked />
        </div>
        <div className="flex flex-row w-full justify-between">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Contact Data
          </Typography>
          <Switch color="blue" defaultChecked />
        </div>
        <div className="flex flex-row w-full justify-between">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Oppointments Data
          </Typography>
          <Switch color="blue" defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default Pconsent;
