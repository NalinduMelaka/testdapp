import React, { useState } from "react";
import { useAuth } from "../../context/use-auth-client";
import { dapp_backend } from "../../../../declarations/dapp_backend";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

const NewMedication = () => {
  const { member, membertype, logout, isMember } = useAuth();
  const [isprocess, setIsprocess] = useState(false);
  const [med, setMed] = useState({
    drugname: "",
    status: "",
    dose: "",
    note: "",
    reason: "",
    picture: "",
    prescriber: "",
    timestamp: 0, // Initialize with 0
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const updatedMed = { ...med, timestamp: Date.now() * 1_000_000 };
    const result = await dapp_backend.addMedication(updatedMed);
    if ("ok" in result) {
      toast.success("🦄 Created successfully!", {
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
      setTimeout(() => {
        navigate("/patient/medications");
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMed({ ...med, [name]: value });
  };

  return (
    <div className="h-full w-full p-4">
      <p className="font-bold text-xl">New medication</p>
      <div className="w-2/3">
        <div className="flex flex-row justify-between py-4 gap-12">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Drug Name:
          </Typography>
          <Input
            type="text"
            name="drugname"
            value={med.drugname}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row justify-between py-4 gap-12">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Status:
          </Typography>

          <Input
            type="text"
            name="status"
            value={med.status}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row justify-between py-4 gap-12">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Dose:
          </Typography>

          <Input
            type="text"
            name="dose"
            value={med.dose}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex justify-between flex-row gap-12">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Note:
          </Typography>
          <Input
            type="text"
            name="note"
            value={med.note}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row justify-between py-4 gap-12">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Reason:
          </Typography>
          <Textarea
            rows="5"
            cols="20"
            name="reason"
            value={med.reason}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          ></Textarea>
        </div>
      </div>
      <div className="flex justify-center h-8">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default NewMedication;
