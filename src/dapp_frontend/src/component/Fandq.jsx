import React, { useEffect, useState } from 'react'
import PatientLayout from './patient/PatientLayout'
import Register from './Register'
import {
  Spinner, Avatar, Popover,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { SidebarWithCta } from './patient/SidebarWithCta';
import user from '../img/user.svg'
import { SidebarWithBurgerMenu } from './SidebarWithBurgerMenu';
import Psettings from './patient/Psettings';
import Phsettings from './pharmacist/Phsettings';
import Dsettings from './doctor/Dsettings';
import { useAuth } from '../context/use-auth-client';
import { dapp_backend } from '../../../declarations/dapp_backend';

const Fandq = () => {

  const [userdata, setUserdata] = useState({});
  const [open, setOpen] = React.useState(false);
  const { member, membertype } = useAuth();
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    setUserdata(member);
  }, [member]);

  useEffect(() => {
    if (membertype) {
      setUserMap(prevState => ({
        [membertype]: userdata
      }));
    }
  }, [membertype, userdata]);

  const renderSettingsComponent = () => {
    switch (membertype) {
      case 'patient':
        return <Psettings onUpdate={handleUpdate} userdata={userdata} setUserdata={setUserdata} />;
      case "doctor":
        return <Dsettings onUpdate={handleUpdate} userdata={userdata} setUserdata={setUserdata} />;
      case "pharma":
        return <Phsettings onUpdate={handleUpdate} userdata={userdata} setUserdata={setUserdata} />;
      default:
        return null;
    }
  };

  const handleUpdate = async () => {
    // Handle the update logic here
    console.log(membertype, userdata, userMap);

    const result = await dapp_backend.updateMember(userMap);
    console.log('Update button clicked', member, userdata, result);
  };

  const hancledelte = async () => {
    //delete user
    const result = await dapp_backend.removeMember();
    console.log("result = ", result);
  }

  const handleOpen = () => setOpen(!open);


  return (
    <div className='w-full'>
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed z-[80]  lg:flex  lg:flex-col lg:fixed bg-[#B5C0D0] ">
        {/*sidebar */}
        <SidebarWithCta />

      </div>
      <main className="md:pl-64  pb-0 h-screen overflow-y-auto bg-[#FEFDED]">
        <div className='w-full h-12  flex flex-row justify-between bg-[#AAD7D9]'>
          <SidebarWithBurgerMenu />
          <div className='w-full flex justify-end'>
            <Avatar src={user} />
          </div>
        </div>
        {/*Navbar */}
        <div className='flex justify-center items-center ' style={{ height: 'calc(100vh - 3rem)' }}>
          {/*main content childrend */}
          <div className='h-full w-full p-4'>
            <p className='font-bold text-2xl mb-8'>Personal settings</p>
            <div>
              <p className='text-md font-bold'>Profile</p>
              <p>This information may be publicaly avalable So be careful what you share</p>
              {renderSettingsComponent()}
            </div>
            <div >
              <p className='font-bold mb-4 mt-8'>Delete Personal Account</p>
              <p className='mb-4'>
                Don't need health record management system any longer?<br />
                We undestand, and appreciate you using our service.
              </p>
              <button className='bg-blue-300 p-2 mt-4 rounded-md  font-bold' onClick={handleOpen} >Delete</button>
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Are you sure?</DialogHeader>
                <DialogBody>
                  After deleting your account, you will no longer be a member of this system, and all your data will be permanently deleted. Are you sure you want to proceed with deleting your account?
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={() => { handleOpen(); hancledelte(); }}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Fandq
