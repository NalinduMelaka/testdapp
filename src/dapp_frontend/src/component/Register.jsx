
import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { useCountries } from "use-react-countries";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Spinner
} from "@material-tailwind/react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { dapp_backend } from "../../../declarations/dapp_backend";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/use-auth-client";

export default function Register() {
  const [value, setValue] = useState('');
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(112);
  const { name, flags, countryCallingCode } = countries[country];
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoad, setIsLoad] = useState(false);

  const [patient, setPatient] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '/',
  });
  const [doctor, setDoctor] = useState({
    firstname: '',
    lastname: '',
    phone: '/',
    medicallicence: ''
  });

  const [pharmacist, setPharmacist] = useState({
    firstname: '',
    lastname: '',
    phone: '/',
    slmcregno: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDocChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handlePhaChange = (e) => {
    const { name, value } = e.target;
    setPharmacist(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const psubmit = async () => {
    if (patient.firstname && patient.lastname && patient.phone) {
      setIsLoad(true);
      const result = await dapp_backend.addMember({ patient: patient });
      if ('ok' in result) {
        toast.success('🦄 Patient added successfully!', {
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
          navigate("patient/dashboard");
        }, 2000)
      } else {
        setIsLoad(false);
        toast.error('Something wrong try again later!', {
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
      toast.error('Please fill Patient Data before register!', {
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

  }

  const dsubmit = async () => {
    if (doctor.firstname && doctor.lastname && doctor.medicallicence) {
      const result = await dapp_backend.addMember({ doctor: doctor });
      setIsLoad(true);
      if ('ok' in result) {
        toast.success('🦄 Doctor added successfully!', {
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
          navigate("doctor/dashboard");
        }, 2000)
      } else {
        setIsLoad(false);
        toast.error('Something wrong try again later!', {
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
      toast.error('Please fill the Doctor Data before register!', {
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

  }


  const phasubmit = async () => {
    setIsLoad(true);
    if (pharmacist.firstname && pharmacist.lastname && pharmacist.slmcregno) {
      const result = await dapp_backend.addMember({ pharma: pharmacist });
      if ('ok' in result) {
        toast.success('🦄 Pharmacist added successfully!', {
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
          navigate("pharmacist/dashboard");
        }, 2000)
      } else {
        setIsLoad(false);
        toast.error('Something wrong try again later!', {
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
      toast.error('Please fill Pharmacist Data before register!', {
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

  }
  return (
    <div className="h-screen w-full">
      <div className="h-12 bg-blue-400 flex items-center justify-end gap-4">
        <button onClick={() => navigate("/")} className="p-1 bg-[#5356FF] border border-black hover:bg-blue-500 rounded-md w-24 text-white font-bold">Home</button>
        <button onClick={logout} className="p-1 bg-[#5356FF] border border-black hover:bg-blue-500 rounded-md w-24 text-white mr-2 font-bold">Logout</button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="sm:w-1/2 md:w-2/3 lg:w-2/6 rounded-xl bg-white h-3/5 lg:h-1/2 ">
          <Tabs value="patient">
            <TabsHeader>
              <Tab key="patient" value="patient">
                patient

              </Tab>
              <Tab key="doctor" value="doctor">
                Doctor
              </Tab>
              <Tab key="pharmacist" value="pharmacist">
                Pharmacist
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }} className="h-full">
              <TabPanel key="patient" value="patient" className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your First Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="firstname"
                    value={patient.firstname}
                    onChange={handleChange}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Second Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="second name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="lastname"
                    value={patient.lastname}
                    onChange={handleChange}
                  />

                  {/**phone number */}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Phone number
                  </Typography>
                  <div className="relative flex w-full ">
                    <Menu placement="bottom-start">
                      <MenuHandler>
                        <Button
                          ripple={false}
                          variant="text"
                          color="blue-gray"
                          className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          {countryCallingCode}
                        </Button>
                      </MenuHandler>
                      <MenuList className="max-h-[20rem] max-w-[18rem]">
                        {countries.map(({ name, flags, countryCallingCode }, index) => {
                          return (
                            <MenuItem
                              key={name}
                              value={name}
                              className="flex items-center gap-2"
                              onClick={() => setCountry(index)}
                            >
                              <img
                                src={flags.svg}
                                alt={name}
                                className="h-5 w-5 rounded-full object-cover"
                              />
                              {name} <span className="ml-auto">{countryCallingCode}</span>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                    <Input
                      type="tel"
                      placeholder="Mobile Number"
                      className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      name="phone"
                      value={patient.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {isLoad ?? <Spinner className="h-4" />}
                  <Button className="" fullWidth onClick={psubmit}>
                    Register
                  </Button>
                </div>
              </TabPanel>
              <TabPanel key="doctor" value="doctor" className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your First Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="firstname"
                    value={doctor.firstname}
                    onChange={handleDocChange}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Second Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="second name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="lastname"
                    value={doctor.lastname}
                    onChange={handleDocChange}
                  />

                  {/**phone number */}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Medical licence
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Medical licence"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="medicallicence"
                    value={doctor.medicallicence}
                    onChange={handleDocChange}
                  />
                  {isLoad ?? <Spinner className="h-4" />}
                  <Button className="" fullWidth onClick={dsubmit}>
                    Register
                  </Button>
                </div>
              </TabPanel>
              <TabPanel key="pharmacist" value="pharmacist">
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your First Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="firstname"
                    value={pharmacist.firstname}
                    onChange={handlePhaChange}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Second Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="second name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="lastname"
                    value={pharmacist.lastname}
                    onChange={handlePhaChange}
                  />

                  {/**phone number */}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    SLMC reg no
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Medical licence"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="slmcregno"
                    value={pharmacist.slmcregno}
                    onChange={handlePhaChange}
                  />
                  {isLoad ?? <Spinner className="h-4" />}
                  <Button className="" fullWidth onClick={phasubmit}>
                    Register
                  </Button>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
