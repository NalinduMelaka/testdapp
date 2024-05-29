import React from "react";
import user from "../../img/user.svg";
import { Apisidebar } from "./Apisidebar";
import { SidebarwithBurgermenuAPI } from "./SidebarwithBurgermenuAPI";
import { Button, Avatar } from "@material-tailwind/react";

const APILayout = ({ children }) => {
  return (
    <div className="w-full">
      <div className="hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 lg:flex lg:w-[15%] lg:flex-col lg:fixed lg_inset-y-0">
        {/*sidebar */}
        <Apisidebar />
      </div>
      <main className="md:pl-56 lg:pl-[15%] pb-0 h-screen overflow-y-auto bg-[#FEFDED]">
        <div className="w-full h-12  flex flex-row justify-between bg-[#FA7070]">
          <SidebarwithBurgermenuAPI />
          <div className="w-full flex justify-end">
            <Avatar src={user} />
          </div>
        </div>
        <div
          className="flex justify-center items-center "
          style={{ height: "calc(100vh - 3rem)" }}
        >
          {/*main content childrend */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default APILayout;
