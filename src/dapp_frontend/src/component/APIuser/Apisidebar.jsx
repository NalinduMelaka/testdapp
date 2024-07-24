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
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Apisidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="space-y-4 py-4 flex flex-col h-full bg-[#A1C398] text-white">
      <div className="mb-2 p-4 mx-auto mt-4">
        <Typography variant="h3" color="blue-gray">
          API User
        </Typography>
      </div>
      <List>
        <Link to={"/datauser"}>
          <ListItem className="text-white w-5/6">
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-[#171f18] font-bold" />
            </ListItemPrefix>
            API
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
