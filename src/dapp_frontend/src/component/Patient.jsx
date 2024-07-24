import React from "react";
import { Pagination } from "./ui/pagination";
import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../context/use-auth-client";

function First({ formData, setFormData }) {
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Name
        </Typography>
        <Input
          size="lg"
          placeholder="Jhone joe"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange("fullname", e.target.value)}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Email
        </Typography>
        <Input
          size="lg"
          placeholder="Jhonejoe@gmail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Phone number
        </Typography>
        <Input
          size="lg"
          placeholder="+94 342 234 34"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
    </>
  );
}

function Second({ formData, setFormData }) {
  const [maritalStatus, setMaritalStatus] = useState("");

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your emegency number
        </Typography>
        <Input
          size="lg"
          placeholder="+94 234 234 23"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange("emagency", e.target.value)}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your NIC
        </Typography>
        <Input
          size="lg"
          placeholder="234234324234"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange("nic", e.target.value)}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Maried or Unmaried
        </Typography>
        <Select
          label="Select maried or unmaried"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          value={maritalStatus}
          onChange={(e) => {
            setMaritalStatus(e);
            handleChange("married", e);
          }}
        >
          <Option value="married">Married</Option>
          <Option value="unmarried">Unmarried</Option>
        </Select>
      </div>
    </>
  );
}

function Third({ formData, setFormData, handleSignUp }) {
  const [date, setDate] = React.useState();
  const [gender, setGender] = useState(null);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Gender
        </Typography>
        <Select
          label="Select Male Female"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          value={gender}
          onChange={(e) => {
            setGender(e);
            handleChange("gender", e);
          }}
        >
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Select the Date of Birth
        </Typography>
        <Popover placement="bottom">
          <PopoverHandler>
            <Input
              label="Select a Date"
              onChange={() => {
                console.log("changed");
                return null;
              }}
              value={date ? format(date, "PPP") : ""}
            />
          </PopoverHandler>
          <PopoverContent className="z-40">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                const day = selectedDate.getDate; // Extract the day from the selected date
                setDate(selectedDate); // Update the date state
                handleChange("dateofbirth", selectedDate.getTime() * 1000000); // Update the form data
              }}
              showOutsideDays
              className="border-0"
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
            />
          </PopoverContent>
        </Popover>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Address
        </Typography>
        <Input
          size="lg"
          placeholder="No 11/23, New Road"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <Button className="mt-6" fullWidth onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </>
  );
}

const Patient = () => {
  const currentDate = new Date();
  const formattedDate = currentDate * 1000000;
  const [active, setActive] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "", // Text in Motoko
    email: "", // Text in Motoko
    phone: "", // Text in Motoko
    emagency: "", // Text in Motoko
    nic: "", // Text in Motoko
    married: "", // Bool in Motoko
    gender: "", // Text in Motoko
    dateofbirth: "", // Time.Time in Motoko
    address: "",
    createdat: formattedDate, // Text in Motoko
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { whoamiActor } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    console.log(formData);
    try {
      await whoamiActor.createPatient(formData);
      console.log("Sign-up successful");
    } catch (error) {
      console.error("Sign-up failed:", error.message);
    }
  };

  let content = null;
  switch (currentPage) {
    case 1:
      content = <First formData={formData} setFormData={setFormData} />;
      break;
    case 2:
      content = <Second formData={formData} setFormData={setFormData} />;
      break;
    case 3:
      content = (
        <Third
          formData={formData}
          setFormData={setFormData}
          handleSignUp={handleSignUp}
        />
      );
      break;
    default:
      content = <First formData={formData} setFormData={setFormData} />;
      break;
  }

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    setActive(page);
  };

  return (
    <div>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col">
        {content}
        <Pagination
          className="w-full"
          active={active}
          setActive={handlePaginationChange}
        />

        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </div>
  );
};

export default Patient;
