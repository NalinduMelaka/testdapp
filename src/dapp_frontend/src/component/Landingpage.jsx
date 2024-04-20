import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../context/use-auth-client';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { Button } from "@material-tailwind/react";


const Landingpage = () => {

  const [prin, setPrin] = useState('');
  const { isAuthenticated, principal, whoamiActor } = useAuth();

  const handleClick = async (event) => {
    const whoam = await whoamiActor.whoami();
    setPrin(whoam.toString());
    console.log("who is", whoam)
  }
  return (
    <div className="overflow-x-hidden">
      <p>Landing page</p>
      <p><Link to="/about" >About</Link></p>
      <p><Link to="/dashboard" >dashboard</Link></p>
      <p><Link to="/about" >About</Link></p>
      <Button>Button</Button>
      <button onClick={handleClick} className='bg-black text-white p-3'>click me</button>
      <p>whoam is {prin}</p>

      <section>{isAuthenticated ? <LoggedIn /> : <LoggedOut />}</section>
    </div>
  )
}

export default Landingpage
