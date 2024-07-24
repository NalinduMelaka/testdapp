import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleUserIcon } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Typography,
  Button,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { useAuth } from "../../context/use-auth-client";

const Pcontactdynamic = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  const [type, setType] = useState();
  const [isprocess, setIsprocess] = useState(false);
  const navigate = useNavigate();
  const { whoamiActor } = useAuth();

  const handledelte = async () => {
    //delete medicatoin
    setIsprocess(true);
    setLoading(true);
    const idNumber = Number(id);
    const result = await whoamiActor.deleteContactAtIndex(idNumber);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const idNumber = Number(id);
      console.log("id is", idNumber);
      const result = await whoamiActor.getContactid(idNumber);
      if ("ok" in result) {
        const type = Object.keys(result.ok)[0];
        setData(result.ok[type]);
        setType(type);
        console.log("ind", result.ok, result.ok[type], "type", type);
        setLoading(false);
      } else {
        setLoading(false);
        setNodata(true);
        console.log("something wrong when fetch the id data");
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (nodata) {
    return (
      <div>
        <p>Something wrong!</p>
      </div>
    );
  }

  const renderComponent = () => {
    switch (type) {
      case "emergency":
        return (
          <Option2InputFields
            data={data}
            setData={setData}
            isprocess={isprocess}
            setIsprocess={setIsprocess}
            navigate={navigate}
            id={id}
            handledelte={handledelte}
          />
        );
      case "care":
        return (
          <Option1InputFields
            data={data}
            setData={setData}
            isprocess={isprocess}
            setIsprocess={setIsprocess}
            navigate={navigate}
            id={id}
            handledelte={handledelte}
          />
        );
      case "provider":
        return (
          <Option3InputFields
            data={data}
            setData={setData}
            isprocess={isprocess}
            setIsprocess={setIsprocess}
            navigate={navigate}
            id={id}
            handledelte={handledelte}
          />
        );
      default:
        return <div>Something wrong</div>;
    }
  };

  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">Contact Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <CircleUserIcon size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Contact
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="mx-16 h-full"> {renderComponent()}</div>
    </div>
  );
};

export default Pcontactdynamic;

const Option1InputFields = ({
  isprocess,
  setIsprocess,
  data,
  setData,
  navigate,
  id,
  handledelte,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const { whoamiActor } = useAuth();

  const handdleSubmit = async () => {
    setIsprocess(true);
    const idNumber = Number(id);
    const result = await whoamiActor.updateContact(idNumber, { care: data });
    if ("ok" in result) {
      toast.success("🦄Updated successfully!", {
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
    <div>
      <Card color="transparent" shadow={false} className="pt-8 mt-12">
        <Typography variant="h4" color="blue-gray">
          Care facility
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Edit your details to update a Care facility contact.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              name="care"
              value={data.care}
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
              value={data.street}
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
              value={data.number}
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
              value={data.zip}
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
              value={data.box}
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
              value={data.town}
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
              value={data.state}
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
              value={data.country}
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
              value={data.phone}
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
              value={data.email}
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
              value={data.comment}
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
          <div className="flex flex-row gap-4">
            <Button className="mt-6 mb-4" onClick={handdleSubmit}>
              Update
            </Button>
            <Button className="mt-6 mb-4" onClick={handledelte}>
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const Option2InputFields = ({
  isprocess,
  setIsprocess,
  data,
  setData,
  navigate,
  id,
  handledelte,
}) => {
  const { whoamiActor } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handdleSubmit = async () => {
    const idNumber = Number(id);
    const result = await whoamiActor.updateContact(idNumber, {
      emergency: data,
    });
    if ("ok" in result) {
      setIsprocess(true);
      toast.success("🦄  updated successfully!", {
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
    <div>
      <Card color="transparent" shadow={false} className="pt-8 mt-12">
        <Typography variant="h4" color="blue-gray">
          Emergency contact
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Edit your details to Update a Emergency contact.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Relationship
            </Typography>
            <Input
              name="relation"
              value={data.relation}
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
              value={data.name}
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
              value={data.phone}
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
              value={data.phone2}
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
              value={data.street}
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
              value={data.number}
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
              value={data.zip}
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
              value={data.box}
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
              value={data.town}
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
              value={data.state}
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
              value={data.country}
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
              value={data.email}
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
              value={data.comment}
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
          <div className="flex flex-row gap-4">
            <Button className="mt-6 mb-4" onClick={handdleSubmit}>
              Update
            </Button>
            <Button className="mt-6 mb-4" onClick={handledelte}>
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// Input fields component for Option 3
const Option3InputFields = ({
  isprocess,
  setIsprocess,
  data,
  setData,
  navigate,
  id,
  handledelte,
}) => {
  const { whoamiActor } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handdleSubmit = async () => {
    setIsprocess(true);
    const idNumber = Number(id);
    const result = await whoamiActor.updateContact(idNumber, {
      provider: data,
    });
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
    <div>
      <Card color="transparent" shadow={false} className="pt-8 mt-12">
        <Typography variant="h4" color="blue-gray">
          Provider contact
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Edit your details to Update a Provider contact.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Matter domain
            </Typography>
            <Input
              name="matterdomain"
              value={data.matterdomain}
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
              value={data.phone}
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
              value={data.mobile}
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
              value={data.street}
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
              value={data.number}
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
              value={data.zip}
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
              value={data.box}
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
              value={data.town}
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
              value={data.state}
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
              value={data.country}
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
              value={data.email}
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
              value={data.comment}
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
          <div className="flex flex-row gap-4">
            <Button className="mt-6 mb-4" onClick={handdleSubmit}>
              Update
            </Button>
            <Button className="mt-6 mb-4" onClick={handledelte}>
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
