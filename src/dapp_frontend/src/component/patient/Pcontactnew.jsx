import React, { useState } from "react";
import {
  List,
  ListItem,
  Card,
  Input,
  Typography,
  Button,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { dapp_backend } from "../../../../declarations/dapp_backend";

// Option selection component
const OptionSelector = ({ onSelect }) => {
  return (
    <div className="h-full overflow-y-auto w-full flex items-center justify-center">
      <Card>
        <List>
          <ListItem onClick={() => onSelect("Option 1")}>
            Care facility
          </ListItem>
          <ListItem onClick={() => onSelect("Option 2")}>
            Emergncy contact
          </ListItem>
          <ListItem onClick={() => onSelect("Option 3")}>Provider</ListItem>
        </List>
      </Card>
    </div>
  );
};

// Input fields component for Option 1
const Option1InputFields = ({
  isprocess,
  setIsprocess,
  care,
  setCare,
  navigate,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCare({ ...care, [name]: value });
  };

  const handdleSubmit = async () => {
    setIsprocess(true);
    console.log("content", care);
    const result = await dapp_backend.addContact({ care: care });
    if ("ok" in result) {
      toast.success("🦄 Created successfully!", {
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
        navigate("/patient/emergency");
      }, 2000);
    } else {
      setIsprocess(false);
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
  };
  return (
    <div className="h-full overflow-y-auto w-full md:text-xl 2xl:text-2xl flex justify-center">
      <Card color="transparent" shadow={false} className="pt-8 mt-12">
        <Typography variant="h4" color="blue-gray">
          Care facility
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to create a Care facility contact.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              name="name"
              value={care.name}
              onChange={handleChange}
              size="lg"
              placeholder="i care"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Street
            </Typography>
            <Input
              name="street"
              value={care.street}
              onChange={handleChange}
              size="lg"
              placeholder="main road"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Number
            </Typography>
            <Input
              name="number"
              value={care.number}
              onChange={handleChange}
              size="lg"
              placeholder="no: 1"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Zip
            </Typography>
            <Input
              name="zip"
              value={care.zip}
              onChange={handleChange}
              size="lg"
              placeholder="NL23422"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Box
            </Typography>
            <Input
              name="box"
              value={care.box}
              onChange={handleChange}
              size="lg"
              placeholder="Number11"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Town
            </Typography>
            <Input
              name="town"
              value={care.town}
              onChange={handleChange}
              size="lg"
              placeholder="K town"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              State
            </Typography>
            <Input
              name="state"
              value={care.state}
              onChange={handleChange}
              size="lg"
              placeholder="california"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Country
            </Typography>
            <Input
              name="country"
              value={care.country}
              onChange={handleChange}
              size="lg"
              placeholder="Sri Lanka"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone
            </Typography>
            <Input
              name="phone"
              value={care.phone}
              onChange={handleChange}
              size="lg"
              placeholder="+234234232..."
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              name="email"
              value={care.email}
              onChange={handleChange}
              size="lg"
              placeholder="their@email.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Comment
            </Typography>
            <Textarea
              name="comment"
              value={care.comment}
              onChange={handleChange}
              size="lg"
              placeholder="This record .."
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {isprocess && (
            <div className="flex justify-center items-center">
              <Spinner color="green" className="my-2" />
            </div>
          )}
          <Button className="mt-6 mb-4" fullWidth onClick={handdleSubmit}>
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};

// Input fields component for Option 2
const Option2InputFields = ({
  isprocess,
  setIsprocess,
  emergancy,
  setEmergancy,
  navigate,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergancy({ ...emergancy, [name]: value });
  };
  const handdleSubmit = async () => {
    console.log("content", emergancy);
    const result = await dapp_backend.addContact({ emergency: emergancy });
    if ("ok" in result) {
      toast.success("🦄 Created successfully!", {
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
        navigate("/patient/emergency");
      }, 2000);
    } else {
      setIsprocess(false);
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
  };
  return (
    <div className="h-full overflow-y-auto w-full md:text-xl 2xl:text-2xl flex justify-center">
      <Card color="transparent" shadow={false} className="pt-8 mt-12">
        <Typography variant="h4" color="blue-gray">
          Emergency contact
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to create a Emergency contact.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Relationship
            </Typography>
            <Input
              name="relation"
              value={emergancy.relation}
              onChange={handleChange}
              size="lg"
              placeholder="Brother"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              name="name"
              value={emergancy.name}
              onChange={handleChange}
              size="lg"
              placeholder="Omar"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone
            </Typography>
            <Input
              name="phone"
              value={emergancy.phone}
              onChange={handleChange}
              size="lg"
              placeholder="+234234232..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone2
            </Typography>
            <Input
              name="phone2"
              value={emergancy.phone2}
              onChange={handleChange}
              size="lg"
              placeholder="+234234232..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Street
            </Typography>
            <Input
              name="street"
              value={emergancy.street}
              onChange={handleChange}
              size="lg"
              placeholder="main road"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Number
            </Typography>
            <Input
              name="number"
              value={emergancy.number}
              onChange={handleChange}
              size="lg"
              placeholder="no: 1"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Zip
            </Typography>
            <Input
              name="zip"
              value={emergancy.zip}
              onChange={handleChange}
              size="lg"
              placeholder="NL23422"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Box
            </Typography>
            <Input
              name="box"
              value={emergancy.box}
              onChange={handleChange}
              size="lg"
              placeholder="Number11"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Town
            </Typography>
            <Input
              name="town"
              value={emergancy.town}
              onChange={handleChange}
              size="lg"
              placeholder="K town"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              State
            </Typography>
            <Input
              name="state"
              value={emergancy.state}
              onChange={handleChange}
              size="lg"
              placeholder="califonia"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Country
            </Typography>
            <Input
              name="country"
              value={emergancy.country}
              onChange={handleChange}
              size="lg"
              placeholder="Sri Lanka"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              name="email"
              value={emergancy.email}
              onChange={handleChange}
              size="lg"
              placeholder="their@email.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              comment
            </Typography>
            <Textarea
              name="comment"
              value={emergancy.comment}
              onChange={handleChange}
              size="lg"
              placeholder="This record .."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {isprocess && (
            <div className="flex justify-center items-center">
              <Spinner color="green" className="my-2" />
            </div>
          )}
          <Button className="mt-6 mb-4" fullWidth onClick={handdleSubmit}>
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};

// Input fields component for Option 3
const Option3InputFields = ({
  isprocess,
  setIsprocess,
  provider,
  setProvider,
  navigate,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider({ ...provider, [name]: value });
  };
  const handdleSubmit = async () => {
    console.log("content", provider);
    const result = await dapp_backend.addContact({ provider: provider });
    if ("ok" in result) {
      toast.success("🦄 Created successfully!", {
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
        navigate("/patient/emergency");
      }, 2000);
    } else {
      setIsprocess(false);
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
  };
  return (
    <div className="h-full overflow-y-auto w-full md:text-xl 2xl:text-2xl flex justify-center">
      <Card color="transparent" shadow={false} className="pt-8 mt-12">
        <Typography variant="h4" color="blue-gray">
          Provider contact
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to create a Provider contact.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              name="name"
              value={provider.name}
              onChange={handleChange}
              size="lg"
              placeholder="Omar"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Matter domain
            </Typography>
            <Input
              name="matterdomain"
              value={provider.matterdomain}
              onChange={handleChange}
              size="lg"
              placeholder="physician"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone
            </Typography>
            <Input
              name="phone"
              value={provider.phone}
              onChange={handleChange}
              size="lg"
              placeholder="+234234232..."
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mobile phone
            </Typography>
            <Input
              name="mobile"
              value={provider.mobile}
              onChange={handleChange}
              size="lg"
              placeholder="+234234232..."
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Street
            </Typography>
            <Input
              name="street"
              value={provider.street}
              onChange={handleChange}
              size="lg"
              placeholder="main road"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Number
            </Typography>
            <Input
              name="number"
              value={provider.number}
              onChange={handleChange}
              size="lg"
              placeholder="no: 1"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Zip
            </Typography>
            <Input
              name="zip"
              value={provider.zip}
              onChange={handleChange}
              size="lg"
              placeholder="NL23422"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Box
            </Typography>
            <Input
              name="box"
              value={provider.box}
              onChange={handleChange}
              size="lg"
              placeholder="Number11"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Town
            </Typography>
            <Input
              name="town"
              value={provider.town}
              onChange={handleChange}
              size="lg"
              placeholder="K town"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              State
            </Typography>
            <Input
              name="state"
              value={provider.state}
              onChange={handleChange}
              size="lg"
              placeholder="California"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Country
            </Typography>
            <Input
              name="country"
              value={provider.country}
              onChange={handleChange}
              size="lg"
              placeholder="Sri Lanka"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              name="email"
              value={provider.email}
              onChange={handleChange}
              size="lg"
              placeholder="their@email.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Comment
            </Typography>
            <Textarea
              name="comment"
              value={provider.comment}
              onChange={handleChange}
              size="lg"
              placeholder="This record .."
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {isprocess && (
            <div className="flex justify-center items-center">
              <Spinner color="green" className="my-2" />
            </div>
          )}
          <Button className="mt-6 mb-4" fullWidth onClick={handdleSubmit}>
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};

// Main component
const Pcontactnew = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isprocess, setIsprocess] = useState(false);
  const navigate = useNavigate();

  const [provider, setProvider] = useState({
    matterdomain: "",
    street: "",
    number: "",
    zip: "",
    box: "",
    town: "",
    state: "",
    country: "",
    phone: "",
    mobile: "",
    email: "",
    comment: "",
    timestamp: Date.now() * 1_000_000, // Using BigInt for the Nat type
  });

  const [emergancy, setEmergancy] = useState({
    relation: "",
    name: "",
    phone: "",
    phone2: "",
    email: "",
    street: "",
    number: "",
    zip: "",
    box: "",
    town: "",
    state: "",
    country: "",
    comment: "",
    timestamp: Date.now() * 1_000_000,
  });

  const [care, setCare] = useState({
    care: "",
    street: "",
    number: "",
    zip: "",
    box: "",
    town: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    comment: "",
    timestamp: Date.now() * 1_000_000,
  });
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="h-full w-full">
      {!selectedOption ? (
        <OptionSelector onSelect={handleOptionSelect} />
      ) : selectedOption === "Option 1" ? (
        <Option1InputFields
          isprocess={isprocess}
          setIsprocess={setIsprocess}
          care={care}
          setCare={setCare}
          navigate={navigate}
        />
      ) : selectedOption === "Option 2" ? (
        <Option2InputFields
          isprocess={isprocess}
          setIsprocess={setIsprocess}
          emergancy={emergancy}
          setEmergancy={setEmergancy}
          navigate={navigate}
        />
      ) : (
        <Option3InputFields
          isprocess={isprocess}
          setIsprocess={setIsprocess}
          provider={provider}
          setProvider={setProvider}
          navigate={navigate}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Pcontactnew;
