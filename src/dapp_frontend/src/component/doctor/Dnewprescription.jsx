import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import Date from "./Date";
import { dapp_backend } from "../../../../declarations/dapp_backend";
const Dnewprescription = () => {
  // State to track if the prescription is being processed
  const [isprocess, setIsprocess] = useState(false);
  const [nanoseconds, setNanoseconds] = useState(null); // Set default to null
  // State to store the prescription details
  const [med, setMed] = useState({
    conform: false, // Checkbox to indicate if the prescription is conform
    medications: [], // Array to store medication names
    status: "", // Status of the prescription
    dose: [], // Array to store dosage information
    note: "", // Additional notes for the prescription
    reason: "", // Reason for the prescription
    prescriber: "", // Name of the prescriber
    timestamp: null, // Timestamp of the prescription (initialized to 0)
  });

  const navigate = useNavigate();

  // Update the timestamp in the med state when nanoseconds changes
  useEffect(() => {
    setMed((prevMed) => ({
      ...prevMed,
      timestamp: nanoseconds,
    }));
  }, [nanoseconds]);

  // Function to handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the input is for medications, split the value by comma and trim whitespace
    if (name === "medications") {
      const medicationsArray = value.split(",").map((med) => med.trim());
      setMed({ ...med, medications: medicationsArray });
    } else if (name === "dose") {
      // If the input is for dose, split the value by comma and trim whitespace
      const medicationsArray = value.split(",").map((med) => med.trim());
      setMed({ ...med, dose: medicationsArray });
    } else {
      // For other inputs, update the corresponding state property
      setMed({ ...med, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setIsprocess(true);
    const result = await dapp_backend.addprescriptionfordoc(med);
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
      setIsprocess(false);
      setTimeout(() => {
        navigate("/doctor/prescription");
      }, 2000);
    } else {
      setIsprocess(false);
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
  return (
    <div className="h-full w-full p-4 overflow-y-auto">
      {/* Heading for the new prescription form */}
      <p className="font-bold text-xl">New Prescription</p>
      <div className="w-2/3">
        <div className="flex flex-row justify-between py-4 gap-12">
          {/* Label for the drug names input */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Drug Names:
          </Typography>
          {/* Input field for drug names */}
          <Input
            type="text"
            name="medications"
            value={med.medications.join(", ")}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <ToastContainer />
        <div className="flex flex-row justify-between py-4 gap-12">
          {/* Label for the status input */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Status:
          </Typography>
          {/* Input field for status */}
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
          {/* Label for the note input */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Note:
          </Typography>
          {/* Input field for note */}
          <Textarea
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
          {/* Label for the reason input */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Reason:
          </Typography>
          {/* Input field for reason */}
          <Textarea
            type="text"
            name="reason"
            value={med.reason}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row justify-between py-4 gap-12">
          {/* Label for the dose input */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Dose:
          </Typography>
          {/* Input field for dose */}
          <Textarea
            type="text"
            name="dose"
            value={med.dose.join(", ")}
            onChange={handleChange}
            className="w-72 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row justify-between py-4 gap-12">
          {/* Label for the date input */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Date:
          </Typography>
          <Date nanoseconds={nanoseconds} setNanoseconds={setNanoseconds} />
        </div>
      </div>
      {isprocess && (
        <div className="flex justify-center items-center">
          <Spinner color="green" className="my-2" />
        </div>
      )}
      <div className="flex justify-center h-8 mb-4">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Dnewprescription;
