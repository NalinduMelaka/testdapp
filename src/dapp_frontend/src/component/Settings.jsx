import React, { useEffect, useState } from "react";
import PatientLayout from "./patient/PatientLayout";
import Register from "./Register";
import {
  Spinner,
  Avatar,
  Popover,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { SidebarWithCta } from "./patient/SidebarWithCta";
import user from "../img/user.svg";
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";
import Psettings from "./patient/Psettings";
import Phsettings from "./pharmacist/Phsettings";
import Dsettings from "./doctor/Dsettings";
import APIsettings from "./APIuser/APIsettings";
import { useAuth } from "../context/use-auth-client";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cog } from "lucide-react";

const Settings = () => {
  const [userdata, setUserdata] = useState({});
  const [open, setOpen] = React.useState(false);
  const {
    member,
    membertype,
    logout,
    setIsMember,
    setMemebertype,
    whoamiActor,
  } = useAuth();
  const [userMap, setUserMap] = useState({});
  const [isprocess, setIsprocess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserdata(member);
  }, [member]);

  useEffect(() => {
    if (membertype) {
      setUserMap((prevState) => ({
        [membertype]: userdata,
      }));
    }
  }, [membertype, userdata]);

  const renderSettingsComponent = () => {
    switch (membertype) {
      case "patient":
        return (
          <Psettings
            onUpdate={handleUpdate}
            userdata={userdata}
            setUserdata={setUserdata}
          />
        );
      case "doctor":
        return (
          <Dsettings
            onUpdate={handleUpdate}
            userdata={userdata}
            setUserdata={setUserdata}
          />
        );
      case "pharma":
        return (
          <Phsettings
            onUpdate={handleUpdate}
            userdata={userdata}
            setUserdata={setUserdata}
          />
        );
      case "apiuser":
        return (
          <APIsettings
            onUpdate={handleUpdate}
            userdata={userdata}
            setUserdata={setUserdata}
          />
        );
      default:
        return null;
    }
  };

  const handleUpdate = async () => {
    // Handle the update logic here
    setIsprocess(true);
    console.log(membertype, userdata, userMap);

    const result = await whoamiActor.updateMember(userMap);
    console.log("Update button clicked", member, userdata, result);
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

  const hancledelte = async () => {
    //delete user
    setIsprocess(true);
    setIsMember(false);
    setMemebertype(null);
    const result = await whoamiActor.removeMember();
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
        navigate("/register");
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

  const handleOpen = () => setOpen(!open);

  return (
    <div className="h-full w-full p-4">
      <p className="font-bold text-2xl mb-8">Personal settings</p>
      <div>
        <div className="flex flex-row items-center gap-2 ">
          <Cog size={48} />
          <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
            Profile
          </p>
        </div>
        <p className="mt-4 mb-4">
          This information may be publicaly avalable So be careful what you
          share
        </p>
        {renderSettingsComponent()}
      </div>
      <div>
        <p className="font-bold mb-4 mt-8">Delete Personal Account</p>
        <p className="mb-4">
          Don't need health record management system any longer?
          <br />
          We undestand, and appreciate you using our service.
        </p>
        <button
          className="bg-blue-300 p-2 mt-4 rounded-md  font-bold"
          onClick={handleOpen}
        >
          Delete
        </button>
        <div className="w-full flex justify-center items-center h-4">
          {isprocess && <Spinner />}
        </div>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Are you sure?</DialogHeader>
          <DialogBody>
            After deleting your account, you will no longer be a member of this
            system, and all your data will be permanently deleted. Are you sure
            you want to proceed with deleting your account?
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
                hancledelte();
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
