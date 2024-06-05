import React from "react";
import { useAuth } from "../context/use-auth-client";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const DashboardButton = () => {
  const { membertype } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (membertype == "patient") {
      navigate("/patient");
    } else if (membertype == "doctor") {
      navigate("/doctor");
    } else if (membertype == "pharma") {
      navigate("/pharmacist");
    } else if (membertype == "apiuser") {
      navigate("/datauser");
    } else {
      navigate("/register");
    }
  };
  return <Button onClick={handleClick}>Dashboard</Button>;
};

export default DashboardButton;
