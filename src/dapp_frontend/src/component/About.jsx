// About.js
import React from 'react';
import Registraton from './Registraton';
import { useAuth } from '../context/use-auth-client';

const About = () => {
  const { isAuthenticated, authClient } = useAuth();
  console.log("from the about", isAuthenticated, authClient);
  return (
    <div className='h-screen overflow-y-auto'>
      <Registraton />
    </div>
  );
};

export default About;
