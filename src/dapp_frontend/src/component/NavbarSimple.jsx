import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../context/use-auth-client";

function NavList() {

  const { login, isAuthenticated, logout, membertype, } = useAuth();

  const handleLogin = () => {
    if (!isAuthenticated) {
      login();
    }
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      logout();
      window.location.reload();
    }
  };

  useEffect(() => {

  }, [])

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
          How it works
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Use Cases
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Resources
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/new" className="flex items-center hover:text-blue-500 transition-colors">
          About
        </Link>
      </Typography>
      {console.log("this is auth based on contest", isAuthenticated)}
      {(isAuthenticated == true) ?
        <Button onClick={handleLogout}>Logout</Button>
        :
        <Button onClick={login}>Log in</Button>
      }
      {(isAuthenticated != true) ? <Button color="blue" onClick={login}>Sign up</Button> : <></>}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className=" w-screen px-14 py-3" fullWidth={true}>
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          HealthPass
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}