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
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithCta() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="w-full h-full bg-[#B5C0D0]" >
      <div className="mb-2 p-4 mx-auto mt-4">
        <Typography variant="h3" color="blue-gray">
          Patient
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <EllipsisHorizontalCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CheckBadgeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Oppoinments
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CogIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log book @ notes
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Hospital Visits
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Contacts
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PencilSquareIcon className="h-5 w-5" />
          </ListItemPrefix>
          Clinical notes
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
          </ListItemPrefix>
          Consensus
        </ListItem>

        <hr className="my-2 border-blue-gray-50" />



      </List>

    </Card>
  );
}