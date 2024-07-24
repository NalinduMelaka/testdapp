// About.js
import React, { useEffect } from "react";
import Registraton from "./Registraton";
import { useAuth } from "../context/use-auth-client";

const About = () => {
  const { isAuthenticated, authClient, whoamiActor } = useAuth();

  useEffect(() => {
    console.log("from the about the actor:::", whoamiActor);
  }, []);
  return (
    <div className="h-screen overflow-y-auto">
      <Registraton />
    </div>
  );
};

export default About;
