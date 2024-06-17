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
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";

export function Phsidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="w-full space-y-4 py-2 flex flex-col h-full bg-[#A1C398] text-whit">
      <div className="mb-1 p-2 mx-auto mt-2 flex flex-row gap-4">
        <img src={logo} alt="logo" height="25" width="25" />
        <Link to={"/"}>
          <Typography variant="h4" color="white">
            Pharmacist
          </Typography>
        </Link>
      </div>
      <List>
        <Link to={"/pharmacist"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <EllipsisHorizontalCircleIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/pharmacist/medications">
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            Medications
          </ListItem>
        </Link>
        <Link to="/pharmacist/prescriptions">
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <BeakerIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            Prescription
          </ListItem>
        </Link>
        <Link to="/pharmacist/reports">
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            Reports
          </ListItem>
        </Link>
        <Link to={"/settings"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <CogIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
