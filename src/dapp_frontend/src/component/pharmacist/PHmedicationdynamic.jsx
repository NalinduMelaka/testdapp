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
} from "@material-tailwind/react";

const PHmedicationdynamic = () => {
  let { id } = useParams();
  const { member, isMember, whoamiActor } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [isdeleting, setIsdeleting] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const handleOpenShare = () => setOpenShare(!openShare);

  useEffect(() => {
    if (isMember) {
      const getdata = async () => {
        const idNumber = Number(id);
        console.log("id is", idNumber);
        const result = await whoamiActor.getmedicationforpha(idNumber);

        console.log(result.ok);
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

  const handledelte = async () => {
    //delete medicatoin
    setIsdeleting(true);
    const idNumber = Number(id);
    const result = await whoamiActor.deletePharmaMedAtIndex(idNumber);
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
  const DeleteDialog = () => {
    return (
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>After delete.</DialogHeader>
        <DialogBody>
          You no longer avalable this data after click the conform
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

  if (nodata) {
    return (
      <div>
        <p>Something wrong!</p>
      </div>
    );
  }

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
                disabled
                size="lg"
                placeholder="Amoxicillin"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                value={data.pharma.drugname}
                name="drugname"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Dose
              </Typography>
              <Input
                disabled
                value={data.pharma.dose}
                size="lg"
                placeholder="100 mg to 1000 mg every 4 to 6 hours as needed."
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="dose"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Status
              </Typography>
              <Input
                disabled
                value={data.pharma.status}
                size="lg"
                placeholder="Active"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="status"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Reason
              </Typography>
              <Input
                disabled
                value={data.pharma.reason}
                size="lg"
                placeholder="Treatment of bacterial infections"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="reason"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Note
              </Typography>
              <Input
                disabled
                value={data.pharma.note}
                size="lg"
                placeholder="This use for my ...."
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="note"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Prescriber
              </Typography>
              <Input
                disabled
                value={data.pharma.prescriber}
                size="lg"
                placeholder="Doctor"
                className={`border-t-blue-gray-200 focus:border-t-gray-900 ${
                  loading ? "animate-pulse" : ""
                }`}
                name="prescriber"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
          <div className="flex flex-row gap-2 mx-auto my-2">
            <Button
              size="md"
              color="red"
              onClick={handleOpen}
              loading={isdeleting}
            >
              Remove from the list
            </Button>
            <DeleteDialog />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PHmedicationdynamic;
