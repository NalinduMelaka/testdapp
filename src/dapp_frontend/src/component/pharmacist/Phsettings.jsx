import React from "react";

const Phsettings = ({ onUpdate, userdata, setUserdata }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="w-full mb-14 mt-12">
      <div className="flex flex-row  w-2/3 my-4 justify-between">
        <label htmlFor="">First Name</label>
        <input
          type="text"
          className="border border-black"
          name="firstname"
          value={userdata?.firstname}
          onChange={handleChange}
        />
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          className="border border-black"
          name="lastname"
          value={userdata?.lastname}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row  w-2/3 my-4 justify-between">
        <label htmlFor="">Phone number</label>
        <input
          type="text"
          className="border border-black"
          name="phone"
          value={userdata?.phone}
          onChange={handleChange}
        />
        <label>slmcregno</label>
        <input
          type="text"
          className="border border-black"
          name="slmcregno"
          value={userdata?.slmcregno}
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-blue-300 p-2 mt-4 rounded-md  font-bold"
        onClick={onUpdate}
      >
        Save changes
      </button>
    </div>
  );
};

export default Phsettings;
