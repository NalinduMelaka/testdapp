import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { dapp_backend } from "../../../../declarations/dapp_backend";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth-client";
import logo from "../../../public/logo.png";
import { Spinner } from "@material-tailwind/react";

const APIRegister = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, isMember } = useAuth();
  const [isLoad, setIsLoad] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "/",
    id: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlesubmit = async () => {
    if (user.firstname && user.lastname && user.phone && user.id) {
      setIsLoad(true);
      const result = await dapp_backend.addMember({ apiuser: user });
      const result2 = await dapp_backend.createApiuserIdMapping(user.id);
      if ("ok" in result && "ok" in result2) {
        toast.success("🦄 Patient added successfully!", {
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
          window.location.reload();
        }, 2000);
      } else {
        setIsLoad(false);
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
    } else {
      toast.error("Please fill Patient Data before register!", {
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
      console.log("no data");
    }
  };

  if (isMember && isAuthenticated) {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-[#EEEEEE] flex items-center justify-center">
        <p>
          You are already registed as a user. Please delete that account or use
          correct paths!
        </p>
      </div>
    );
  } else if (!isMember && isAuthenticated) {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-[#EEEEEE]">
        <div className="h-12 bg-[#222831] flex items-center justify-end gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-1 bg-[#00ADB5] border border-black hover:bg-blue-500 rounded-md w-24 text-white font-bold"
          >
            Home
          </button>
          <button
            onClick={logout}
            className="p-1 bg-[#00ADB5] border border-black hover:bg-blue-500 rounded-md w-24 text-white mr-2 font-bold"
          >
            Logout
          </button>
        </div>
        <div className="h-max w-full flex flex-col justify-center items-center mt-8">
          <div className="h-[500px] overflow-y-auto bg-[#393E46] sm:w-5/6 flex flex-col lg:flex-row rounded-3xl">
            <div className="h-max mt-4 mb-2 lg:mb-0 lg:mt-0 lg:h-full w-full flex flex-col justify-center items-center">
              <img src={logo} alt="Logo" className="h-24 w-24" />
              <p className="text-white font-bold mb-4 mt-4">
                Account creation for Heath pass API user
              </p>
              <p className="mx-8 text-white text-center text-sm">
                Registered users can access and use the Health Pass API based on
                their permissions. This API allows users to securely retrieve
                patients' health records, with access levels determined by
                granted permissions to ensure data protection and authorized
                access only.
              </p>
            </div>
            <div className="h-full w-full flex flex-col justify-center items-center">
              <div className="flex flex-col">
                <label className="text-white text-lg">First Name</label>
                <input
                  type="text"
                  className={`w-64 rounded-lg h-7 required ${
                    isLoad ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoad}
                  name="firstname"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-lg">Last Name</label>
                <input
                  type="text"
                  className={`w-64 rounded-lg h-7 required ${
                    isLoad ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoad}
                  name="lastname"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-lg">Phone Number</label>
                <input
                  type="tel"
                  className={`w-64 rounded-lg h-7 required ${
                    isLoad ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoad}
                  name="phone"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-lg">ID No</label>
                <input
                  type="text"
                  className={`w-64 rounded-lg h-7 required ${
                    isLoad ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoad}
                  name="id"
                  onChange={handleUserChange}
                />
              </div>
              <button
                className={`w-64 bg-[#00ADB5] rounded-lg text-white font-bold mt-4 hover:bg-red-300 p-1 ${
                  isLoad ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoad}
                onClick={handlesubmit}
              >
                {`${isLoad ? "Registering ..." : "Register"}`}
              </button>
              <div>
                {isLoad ? (
                  <Spinner color="green" className="h-8 w-8 mt-2" />
                ) : null}
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-red-400 text-lg font-bold">
        <p>You don't have permission</p>
      </div>
    );
  }
};

export default APIRegister;
