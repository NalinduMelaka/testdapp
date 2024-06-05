import React, { useEffect, useRef } from "react";

import { Signup } from "./Signup";
import Home from "./Home";
import mainimg from "../img/main.jpg";
import { FooterWithSitemap } from "./ FooterWithSitemap";

const Land = () => {
  return (
    <div className="max-w-screen bg-white overflow-x-hidden">
      <Home />
      <div className="relative mx-auto w-5/6 rounded-md sm:h-72 mt-12 overflow-hidden">
        <img src={mainimg} className="bg-cover mx-auto" />
      </div>
      <section className="flex flex-col w-5/6 mx-auto mt-12">
        <div>
          <h1 className="text-2xl font-extrabold mb-4">Why HealthPass?</h1>
        </div>
        <div>
          <p className="text-base">
            HealthPass is the next generation of personal health records,
            desinged for privacy, security
            <br /> and ease of use. It&apos;s the only health record that you
            truly own and control.
          </p>
        </div>
      </section>
      <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8 w-5/6">
        <li className=" bg-teal-100 p-4 w-5/6">
          Secure and private: HealthPass ensures that your health records are
          securely stored and accessible only by you and authorized healthcare
          providers
        </li>
        <li className=" bg-teal-100 p-4 w-5/6">
          Blockchain technology: Utilizes blockchain technology for transparent
          and tamper-proof record keeping, ensuring the integrity of your health
          data.
        </li>
        <li className=" bg-teal-100 p-4  w-5/6">
          User-controlled access: Allows you to control who can access your
          health records, ensuring that your data is only shared with your
          consent.
        </li>
      </ul>
      <FooterWithSitemap />
    </div>
  );
};

export default Land;
