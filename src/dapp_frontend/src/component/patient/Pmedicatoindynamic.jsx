/**
 * The `Pmedicatoindynamic` component is responsible for rendering the medication data for a patient. It fetches the medication data from the backend, allows the user to update the medication information, and provides options to share or delete the medication data.
 *
 * The component uses the `useParams` hook to retrieve the `id` parameter from the URL, and the `useAuth` hook to get the current member and member type. It then fetches the medication data using the `getmedication` function from the `dapp_backend` module.
 *
 * The component renders a form with input fields for the medication details, such as drug name, dose, status, reason, note, and prescriber. The user can update these fields and save the changes using the `updateMedication` function from the `dapp_backend` module.
 *
 * The component also includes a "Share" button that opens a dialog for sharing the medication data, and a "Delete" button that opens a dialog for deleting the medication data.
 *
 * The component uses various UI components from the `@material-tailwind/react` library, as well as the `ToastContainer` component from the `react-toastify` library to display success or error messages.
 */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/use-auth-client";
import { Link, useNavigate } from "react-router-dom";
import { FolderCog } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  Card,
  Input,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

const Pmedicatoindynamic = () => {
  let { id } = useParams();
  const { member, membertype, logout, isMember, whoamiActor } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [isprocess, setIsprocess] = useState(false);
  const [isdeleting, setIsdeleting] = useState(false);
  const [slcid, setSlcid] = useState(null);
  const [phama, setPhama] = useState([]);
  const [currentprin, setCurrnetprin] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const handleOpenShare = () => setOpenShare(!openShare);
  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleslcreg = () => {
    setSlcid(inputRef.current.value);
  };

  useEffect(() => {
    if (isMember) {
      const getdata = async () => {
        const idNumber = Number(id);
        console.log("id is", idNumber);
        const result = await whoamiActor.getmedication(idNumber);
        const resulttwo = await whoamiActor.getPharmacists();
        if ("ok" in resulttwo) {
          setPhama(resulttwo.ok);
          console.log("result two==", resulttwo.ok);
        }
        if ("ok" in result) {
          setData(result.ok);
          console.log("ind", result.ok);
          setLoading(false);
        } else {
          setLoading(false);
          setNodata(true);
        }
      };
      getdata();
    }
  }, [member, id]);

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
    const result = await whoamiActor.deleteMedicationAtIndex(idNumber);
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
      setIsdeleting(false);
    }
  };

  //handle the share function

  const handleshare = async () => {
    const result = await whoamiActor.addMedicationphama(data, currentprin);
    console.log("result = ", result);
  };

  const handlechnagetheselect = (event) => {
    setCurrnetprin(event.target.value);
  };

  const ShareDialog = () => {
    return (
      <Dialog open={openShare} handler={handleOpenShare}>
        <DialogHeader>Which pharmacist need to share?.</DialogHeader>
        <DialogBody>
          After sharing this record it will be avalable for other people.
          <Select label="Select pharmacist ">
            <Option>pharmacist 1</Option>
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

  const handleUpdate = async () => {
    // Handle the update logic here
    setIsprocess(true);
    const idNumber = Number(id);
    const result = await whoamiActor.updateMedication(idNumber, data);
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
  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">Medication Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <FolderCog size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Medication
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="mx-16">
        <Card color="transparent" shadow={false}>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Drug Name
              </Typography>
              <Input
                size="lg"
                placeholder="Amoxicillin"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                value={data.drugname}
                name="drugname"
                onChange={handleInputChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Dose
              </Typography>
              <Input
                value={data.dose}
                size="lg"
                placeholder="100 mg to 1000 mg every 4 to 6 hours as needed."
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="dose"
                onChange={handleInputChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Status
              </Typography>
              <Input
                value={data.status}
                size="lg"
                placeholder="Active"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="status"
                onChange={handleInputChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Reason
              </Typography>
              <Input
                value={data.reason}
                size="lg"
                placeholder="Treatment of bacterial infections"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="reason"
                onChange={handleInputChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Note
              </Typography>
              <Input
                value={data.note}
                size="lg"
                placeholder="This use for my ...."
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="note"
                onChange={handleInputChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Prescriber
              </Typography>
              <Input
                value={data.prescriber}
                size="lg"
                placeholder="Doctor"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="prescriber"
                onChange={handleInputChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
          <div className="flex flex-row gap-2 mx-auto my-2">
            <Button size="md" color="ambur" onClick={handleOpenShare}>
              Share
            </Button>
            <ShareDialog
              openShare={openShare}
              handleOpenShare={handleOpenShare}
            />
            <Button
              size="md"
              color="green"
              loading={isprocess}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              size="md"
              color="red"
              onClick={handleOpen}
              loading={isdeleting}
            >
              Delete
            </Button>
            <DeleteDialog />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pmedicatoindynamic;
