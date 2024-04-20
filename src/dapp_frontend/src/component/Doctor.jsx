import React from 'react'
import { Pagination } from "./ui/pagination";
import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
  Select, Option
} from "@material-tailwind/react";



function First() {
  return (<>
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Your Full Name
      </Typography>
      <Input
        size="lg"
        placeholder="Jhone joe"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
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
      />
    </div>

  </>)
}

function Second() {
  return (<>
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Your address
      </Typography>
      <Input
        size="lg"
        placeholder="N0: 234/123, New South, city road"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
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
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Medical License number
      </Typography>
      <Input
        size="lg"
        placeholder="S3432342"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
  </>)
}

function Third() {

  const [date, setDate] = useState(null);
  return (<>
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Gender
      </Typography>
      <Select label="Select Male Female" className=" !border-t-blue-gray-200 focus:!border-t-gray-900">
        <Option>Male</Option>
        <Option>Female</Option>
      </Select>



      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Your Current working Address
      </Typography>
      <Input
        size="lg"
        placeholder="No 11/23, New Road"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
    <Checkbox
      label={
        <Typography
          variant="small"
          color="gray"
          className="flex items-center font-normal"
        >
          I agree the
          <a
            href="#"
            className="font-medium transition-colors hover:text-gray-900"
          >
            &nbsp;Terms and Conditions
          </a>
        </Typography>
      }
      containerProps={{ className: "-ml-2.5" }}
    />
    <Button className="mt-6" fullWidth>
      sign up
    </Button>
  </>)
}



const Doctor = () => {

  const [active, setActive] = useState(1);


  const [currentPage, setCurrentPage] = useState(1);

  let content = null;
  switch (currentPage) {
    case 1:
      content = <First />;
      break;
    case 2:
      content = <Second />;
      break;
    case 3:
      content = <Third />;
      break;
    default:
      content = <First />;
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
        <Pagination className="w-full" active={active} setActive={handlePaginationChange} />
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </div>
  )
}

export default Doctor
