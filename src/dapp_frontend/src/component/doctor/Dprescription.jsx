import React from "react";
import { Syringe } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
const Dprescription = () => {
  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">Prescription Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <Syringe size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Add new Prescription
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="mx-16">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Create new Prescription
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you again and enter details to add prescription for
            patient.
          </Typography>
          <form className="mt-8 w-80">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Select label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Checkbox label="Remember Me" color="green" />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Textarea label="Message" />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Dprescription;
