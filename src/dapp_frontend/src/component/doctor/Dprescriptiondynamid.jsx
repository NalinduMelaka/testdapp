import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Syringe } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Typography,
  Button,
  Textarea,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import Date from "./Date";
import { useAuth } from "../../context/use-auth-client";

const Dprescriptiondynamid = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  const [isprocess, setIsprocess] = useState(false);
  const [nanoseconds, setNanoseconds] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [isdeleting, setIsdeleting] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpenShare = () => setOpenShare(!openShare);
  const { whoamiActor } = useAuth();
  useEffect(() => {
    setData((prevMed) => ({
      ...prevMed,
      timestamp: nanoseconds,
    }));
  }, [nanoseconds]);
  useEffect(() => {
    const getData = async () => {
      const idNumber = Number(id);
      console.log("id is", idNumber);
      const result = await whoamiActor.getPrescriptionId(idNumber);
      if ("ok" in result) {
        setData(result.ok);

        setLoading(false);
      } else {
        setLoading(false);
        setNodata(true);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "medications") {
      const medicationsArray = value.split(",").map((med) => med.trim());
      setData({ ...data, medications: medicationsArray });
    } else if (name === "dose") {
      // If the input is for dose, split the value by comma and trim whitespace
      const medicationsArray = value.split(",").map((med) => med.trim());
      setData({ ...data, dose: medicationsArray });
    } else {
      // For other inputs, update the corresponding state property
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Handle the update logic here
    setIsprocess(true);
    const idNumber = Number(id);
    const result = await whoamiActor.updatePrescription(idNumber, data);
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
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (nodata) {
    return (
      <div>
        <p>Something wrong!</p>
      </div>
    );
  }
  const handledelte = async () => {
    //delete medicatoin
    setIsdeleting(true);
    const idNumber = Number(id);
    const result = await whoamiActor.deletePrescriptionAtIndex(idNumber);
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

      setTimeout(() => {
        navigate("/doctor/prescription");
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
      setIsdeleting(false);
    }
  };

  const ShareDialog = () => {
    return (
      <Dialog open={openShare} handler={handleOpenShare}>
        <DialogHeader> need to share to patient?.</DialogHeader>
        <DialogBody>
          After sharing this record it will be avalable for other people.
          <Select label="Select pharmacist ">
            <Option>Patient 01</Option>
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenShare}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpenShare();
            }}
          >
            <span>Share</span>
          </Button>
        </DialogFooter>
      </Dialog>
    );
  };
  const DeleteDialog = () => {
    return (
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Are you sure you want to delete this record?.
        </DialogHeader>
        <DialogBody>
          After deleting this record, it will no longer be accessible.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              handledelte();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    );
  };

  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">prescription Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <Syringe size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Prescription
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className="mx-16">
        {/* Heading for the new prescription form */}

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
              value={data.medications}
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
              value={data.status}
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
              value={data.note}
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
              value={data.reason}
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
              value={data.dose}
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
        <div className="flex justify-center flex-row h-8 mb-4 gap-4">
          <Button
            className="bg-red-400"
            loading={isdeleting}
            onClick={handleOpen}
          >
            Delete
          </Button>
          <DeleteDialog />
          <Button color="ambur" onClick={handleOpenShare}>
            share
          </Button>
          <ShareDialog
            openShare={openShare}
            handleOpenShare={handleOpenShare}
          />
          <Button
            onClick={handleSubmit}
            className="bg-blue-500"
            loading={isprocess}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dprescriptiondynamid;
