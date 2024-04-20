import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab
} from "@material-tailwind/react";
import { Signuptabs } from "./ui/Signuptabs";
import { Pagination } from "./ui/pagination";
import { useState } from "react";
import Patient from "./Patient";
import Doctor from "./Doctor";

const data = [
  {
    label: "Patient",
    value: "Patient",

  },
  {
    label: "Doctor",
    value: "Doctor",

  }
];




export function Signup() {
  const [active, setActive] = useState(1);


  const [currentPage, setCurrentPage] = useState("Patient");
  const [content, setContent] = useState(null);


  const handleclick = (value) => {
    setCurrentPage(value);

    switch (value) {
      case "Patient":
        setContent(<Patient />);
        break;
      case "Doctor":
        setContent(<Doctor />);
        break;
      default:
        setContent(<Patient />);
        break;
    }
  };






  return (
    <div className="bg-white mt-28  rounded-lg w-[80%] flex flex-col sm:flex-row justify-center min-h-[80%]">
      <div className="hidden lg:block w-1/2 bg-[#F9B2D4] rounded-sm">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div ></div>
          <h1 className="text-black text-lg font-bold">Dhelth Registration</h1>
          <p className="mx-auto">Decentralized Health record management system.</p>
        </div>
      </div>
      <Card color="transparent" shadow={false} className="mx-auto mt-4">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <Tabs id="custom-animation" value="html" className="mt-4">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={() => handleclick(value)}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col">
          {content ?? <Patient />}
        </form>
      </Card>
    </div>
  );
}