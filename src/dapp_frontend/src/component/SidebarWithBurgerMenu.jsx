import React from "react";
import {
  IconButton,
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
  Input,
  Drawer,
  Card,
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
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithBurgerMenu() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="md:hidden ">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
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
      </Drawer>
    </div>
  );
}