import React, { useState } from "react";
import { useAuth } from "../../context/use-auth-client";
import { dapp_backend } from "../../../../declarations/dapp_backend";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      <div className="w-1/3">
        <div className="flex flex-row justify-between py-4">
          <label>Drug Name:</label>
          <input
            type="text"
            name="drugname"
            value={med.drugname}
            onChange={handleChange}
            className="border border-black mx-4"
          />
        </div>
        <div className="flex flex-row justify-between py-4">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={med.status}
            onChange={handleChange}
            className="border border-black mx-4"
          />
        </div>
        <div className="flex flex-row justify-between py-4">
          <label>Dose:</label>
          <input
            type="text"
            name="dose"
            value={med.dose}
            onChange={handleChange}
            className="border border-black mx-4"
          />
        </div>
        <div className="flex flex-row justify-between py-4">
          <label>Note:</label>
          <input
            type="text"
            name="note"
            value={med.note}
            onChange={handleChange}
            className="border border-black mx-4"
          />
        </div>
        <div className="flex flex-row justify-between py-4">
          <label>Reason:</label>
          <textarea
            rows="5"
            cols="20"
            name="reason"
            value={med.reason}
            onChange={handleChange}
            className="border border-black mx-4"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center h-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewMedication;
