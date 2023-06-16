import React from "react";
import {
  Navbar,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  HomeModernIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import DarkMode from "../DarkMode";


// nav list menu
const navListMenuItems = [
  {
    title: "Page 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Page 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing .",
  },
  {
    title: "Page3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <>
      {/* On Desktop ... */}
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-xl nav-li"
            >
              <Square3Stack3DIcon className="h-[26px] w-[24px]" />
              <span className="comfort text-lg font-extrabold"> Pages{" "}</span>
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[16rem] grid-cols-1 gap-3 overflow-visible lg:grid"
        >
          <ul className="col-span-1 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      {/* On Mobile ... */}
      <>
        <MenuItem
          className="flex items-center gap-2 text-blue-gray-900 lg:hidden nav-li"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Square3Stack3DIcon className="h-[26px] w-[24px]" />
          <span className="comfort text-lg font-extrabold"> Pages{" "}</span>
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-3 w-3 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""
              }`}
          />
        </MenuItem>
        <ul className={`ml-6 ${isMobileMenuOpen ? "flex" : "hidden"} w-full flex-col gap-1 lg:hidden`}>
          {renderItems}
        </ul>
      </>
    </>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeModernIcon,
  },
  {
    label: "About",
    icon: UserGroupIcon,
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:gap-8 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="paragraph"
          color="inherit"
          className="font-bold comfort"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-xl nav-li">
            {React.createElement(icon, { className: "h-[24px] w-[24px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
      <NavListMenu />
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  });

  return (
    <Navbar className="mt-2 mx-auto p-2 ">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="p"
          className="mr-4 ml-2 cursor-default py-1.5 comfort text-2xl font-bold"
        >
          nucast
        </Typography>
        {/* <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div> */}
        <DarkMode />
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          // onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className={`pt-4`}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}