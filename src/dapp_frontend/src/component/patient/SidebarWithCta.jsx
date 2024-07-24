import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  EllipsisHorizontalCircleIcon,
  CheckBadgeIcon,
  CogIcon,
  BookOpenIcon,
  HomeIcon,
  PencilSquareIcon,
  ClipboardDocumentCheckIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../../../../dapp_frontend/public/logo.png";

export function SidebarWithCta() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="w-full space-y-4 py-2 flex flex-col h-full bg-[#A1C398] text-white">
      <div className="mb-1 p-2 mx-auto mt-2 flex flex-row gap-4">
        <img src={logo} alt="logo" height="25" width="25" />
        <Link to={"/"}>
          <Typography variant="h4" color="white">
            Patient
          </Typography>
        </Link>
      </div>
      <List>
        <Link to={"/patient"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <EllipsisHorizontalCircleIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to={"/patient/medications"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <EllipsisHorizontalCircleIcon className="h-5 w-5 text-[#171f18] " />
            </ListItemPrefix>
            Medications
          </ListItem>
        </Link>
        <Link to={"/patient/prescription"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <BeakerIcon className="h-5 w-5 text-[#171f18] " />
            </ListItemPrefix>
            prescription
          </ListItem>
        </Link>
        <Link to={"/patient/appointment"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <CheckBadgeIcon className="h-5 w-5 text-[#171f18] " />
            </ListItemPrefix>
            Oppoinments
          </ListItem>
        </Link>

        <Link to={"/patient/emergency"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-[#171f18]" />
            </ListItemPrefix>
            Contacts
          </ListItem>
        </Link>

        <Link to={"/patient/consent"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-[#171f18]" />
            </ListItemPrefix>
            Consensus
          </ListItem>
        </Link>
        <Link to={"/settings"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <CogIcon className="h-5 w-5 text-[#171f18]" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
