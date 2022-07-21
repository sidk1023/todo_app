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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <div className=" grid grid-cols-2 bg-gray-900 text-gray-200 px-8 h-18 py-3.5 border-b-2  border-b-gray-600">
        <div className=" text-xl sm:text-3xl">
          <CheckIcon /> To Do App
        </div>
        <div className="flex justify-end ">
          <Show above="md">
            <div>
              <Menu>
                <MenuButton
                  mx={4}
                  px={4}
                  py={2}
                  transition="all 0.2s"
                  borderRadius="md"
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "pink.500" }}
                  _focus={{ boxShadow: "none" }}
                  className="text-xl"
                >
                  My Collections <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem>New File</MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuDivider />
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save File</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div className="my-auto text-xl">
              Sign Out
            </div>
          </Show>
          <Show below="md">
            <Button ref={btnRef} colorScheme="pink" onClick={onOpen}>
              <HamburgerIcon height={6} width={6} />
            </Button>
          </Show>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>My Collections</DrawerHeader>

              <DrawerBody className="text-xl">
                <div>
                  <AddIcon /> Add Collection
                </div>
                <div>Collection 1</div>
                <div>Collection 2</div>
                <div>Collection 3</div>
                <div>Collection 4</div>
                <div>Finished Tasks</div>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="pink">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
