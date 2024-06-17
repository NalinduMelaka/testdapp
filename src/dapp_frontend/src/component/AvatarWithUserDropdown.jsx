import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  LifebuoyIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../context/use-auth-client";
import { Link } from "react-router-dom";
import ones from "../../public/123.jpeg";
export function AvatarWithUserDropdown() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout, isAuthenticated } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    if (isAuthenticated) {
      logout();
      window.location.href = "/";
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src={ones}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <Link to="/myprofile">
          <MenuItem
            onClick={closeMenu}
            className="flex items-center gap-2 rounded"
          >
            <UserCircleIcon className="h-4 w-4" strokeWidth={2} />
            <Typography as="span" variant="small" className="font-normal">
              My Profile
            </Typography>
          </MenuItem>
        </Link>
        <Link to="/help">
          <MenuItem
            onClick={closeMenu}
            className="flex items-center gap-2 rounded"
          >
            <LifebuoyIcon className="h-4 w-4" strokeWidth={2} />
            <Typography as="span" variant="small" className="font-normal">
              Help
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
