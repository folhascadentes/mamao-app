import React, { useContext } from "react";
import { MdMenu } from "react-icons/md";
import papaya3d from "./assets/papaya3d.jpeg";
import { StyleContext } from "./reducers/style.reducer";
import { HotkeyContext } from "./reducers/hotkeys.reducer";
import { GlobalHotKeys } from "react-hotkeys";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import AccessibilityMenu from "./AccessibilityMenu";

function Header(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const styleContext = useContext(StyleContext);
  const hotkeyContext = useContext(HotkeyContext);

  return (
    <>
      <style>
        {`
          html { 
            font-size: ${styleContext.state.fontSize}%; 
          } 
          body {
            color: ${styleContext.state.textColor}; 
            background-color: ${styleContext.state.backgroundColor}; 
          }
        `}
      </style>
      <GlobalHotKeys
        keyMap={hotkeyContext.state.hotkeyKeyMap}
        handlers={hotkeyContext.state.hotkeyHandlers}
        allowChanges={true}
      />
      <header>
        <div className="px-8 md:px-24 py-8 flex items-center">
          <div
            style={{ minWidth: window.innerWidth >= 768 ? "239.92px" : "40px" }}
          ></div>
          <div className="container flex justify-center">
            <img src={papaya3d} alt="" style={{ height: "80px" }} />
          </div>
          {window.innerWidth < 768 && (
            <IconButton
              aria-label="Open menu"
              icon={<MdMenu size={32} />}
              variant="outline"
              onClick={onOpen}
            />
          )}
          {window.innerWidth >= 768 && <AccessibilityMenu />}
        </div>

        {window.innerWidth < 768 && (
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerContent
              className="p-6"
              style={{
                backgroundColor: styleContext.state.backgroundColor,
              }}
            >
              <DrawerBody>
                <Flex justifyContent="flex-end">
                  <DrawerCloseButton />
                </Flex>
                <AccessibilityMenu />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </header>
    </>
  );
}

export default Header;
