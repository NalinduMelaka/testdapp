import React, { useState, useEffect } from "react";
import { dapp_backend } from "../../../declarations/dapp_backend";
const T2 = () => {
  useEffect(() => {
    const fetch = async () => {
      const resulttwo = await dapp_backend.getPharmacists();
      console.log(resulttwo);
    };
    fetch();
  }, []);
  return (
    <div className="h-full w-full p-4">
      <p className="font-bold text-xl">Medication details:</p>
      <div className="text-xl flex flex-col gap-4 mt-4 w-1/3">
        <div className=" flex flex-row justify-between">
          <label htmlFor="">Drug Name</label>
          <input type="text" className="border-2 border-black" />
        </div>
        <div className=" flex flex-row justify-between">
          <label htmlFor="">Status</label>
          <input type="text" className="border-2 border-black" />
        </div>
        <div className=" flex flex-row justify-between">
          <label htmlFor="">Does</label>
          <input type="text" className="border-2 border-black" />
        </div>
        <div className=" flex flex-row justify-between">
          <label htmlFor="">Note</label>
          <input type="text" className="border-2 border-black" />
        </div>
        <div className=" flex flex-row justify-between">
          <label htmlFor="">Reasons</label>
          <input type="text" className="border-2 border-black" />
        </div>
      </div>
    </div>
  );
};

export default T2;
