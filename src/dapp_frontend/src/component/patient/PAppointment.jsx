import React, { useEffect, useState } from "react";
import { ContactRound } from "lucide-react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const PAppointment = () => {
  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">Contact Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2">
            <ContactRound size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold">
              Contact List
            </p>
          </div>
          <div>
            <Link to="/patient/emergency/new">
              <div className="text-white bg-black rounded-lg p-2 hover:bg-gray-900 hover:shadow-lg">
                New contact
              </div>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className="mx-16"></div>
    </div>
  );
};

export default PAppointment;
