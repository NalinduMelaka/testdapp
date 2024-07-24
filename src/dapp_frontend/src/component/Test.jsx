import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/use-auth-client";

const Test = () => {
  const { isAuthenticated, loading, whoamiActor } = useAuth();
  console.log("from test page++++", isAuthenticated, whoamiActor);

  if (loading && whoamiActor !== null) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="font-bold text-md text-sky-500">##Loading...</p>
      </div>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <div className=" h-screen w-full flex items-center justify-center">
          <p className="text-red-400 font-bold text-2xl">
            You don't have accesss because not authenticate
          </p>
        </div>
      )}
    </>
  );
};

export default Test;
