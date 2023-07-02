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
import { useNavigate } from "react-router-dom";
import AccessibilityMenu from "./AccessibilityMenu";
import TermsPrivacyUseModal from "./modals/terms-privacy-use.modal";
import { AuthContext } from "./reducers/auth.reducer";

function Header(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const termsDisclousure = useDisclosure();
  const { isAuthenticated } = useContext(AuthContext);
  const styleContext = useContext(StyleContext);
  const hotkeyContext = useContext(HotkeyContext);
  const navigate = useNavigate();

  function handleRedirectHome() {
    navigate("/");

    if (isOpen) {
      onClose();
    }
  }

  function handleLogout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

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
            <img
              className="cursor-pointer"
              onClick={handleRedirectHome}
              src={papaya3d}
              alt=""
              style={{ height: "80px" }}
            />
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
              className="p-8"
              style={{
                backgroundColor: styleContext.state.backgroundColor,
              }}
            >
              <DrawerBody>
                <Flex justifyContent="flex-end">
                  <DrawerCloseButton size="lg" />
                </Flex>
                <div className="flex flex-col font-bold justify-center text-center space-y-6">
                  {/* eslint-disable-next-line */}
                  <a href="#" onClick={handleRedirectHome}>
                    Início
                  </a>
                  <a
                    href="https://www.mamao.dev.br"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Sobre o projeto
                  </a>
                  <a href="/who-is-aiac" rel="noreferrer" target="_blank">
                    Sobre nós
                  </a>
                  <a
                    href="/terms-privacy-and-use"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Termos de privacidade e uso
                  </a>
                </div>
                <div className="font-bold pt-6">Opções de acessibilidade</div>
                <AccessibilityMenu />
                <div className="text-center absolute bottom-0 ml-10 mb-6">
                  <div className="flex flex-col justify-center text-center space-y-6">
                    {isAuthenticated && (
                      // eslint-disable-next-line
                      <a className="font-bold" href="#" onClick={handleLogout}>
                        Sair
                      </a>
                    )}
                    <div className="text-xs">Versão beta-0.0.0</div>
                  </div>
                </div>
              </DrawerBody>
            </DrawerContent>

            <TermsPrivacyUseModal
              isMobile={true}
              isOpen={termsDisclousure.isOpen}
              onClose={termsDisclousure.onClose}
            />
          </Drawer>
        )}
      </header>
    </>
  );
}

export default Header;
