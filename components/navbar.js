import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Show,
  Hide,
} from "@chakra-ui/react";

import { Button, useDisclosure, Input } from "@chakra-ui/react";
import {
  HamburgerIcon,
  CheckIcon,
  AddIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

import React from "react";

export default function Navbar() {
  const btnRef = React.useRef();

  return (
    <>
      <div className=" grid grid-cols-2 bg-gray-900 text-gray-200 px-8 h-18 py-3.5 border-b-2  border-b-gray-600">
        <div className=" text-xl sm:text-3xl">
          <CheckIcon /> To Do App
        </div>
      </div>
    </>
  );
}
