import React, { useContext, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdContrast } from "react-icons/md";
import { StyleContext } from "./reducers/style.reducer";
import { AuthContext } from "./reducers/auth.reducer";
import { HotkeyContext } from "./reducers/hotkeys.reducer";
import { SL } from "./components";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AccessibilityMenu(): JSX.Element {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useContext(AuthContext);
  const styleContext = useContext(StyleContext);
  const hotkeyContext = useContext(HotkeyContext);

  const [backgroundColor, setBackgroundColor] = useState(
    styleContext.state.backgroundColor
  );
  const [textColor, setTextColor] = useState(styleContext.state.textColor);
  const [buttonHoverColorWeight, setButtonHoverColorWeight] = useState(
    styleContext.state.buttonHoverColorWeight
  );
  const [fontSize, setFontSize] = useState<number>(
    localStorage.getItem("fontSize")
      ? Number(localStorage.getItem("fontSize"))
      : 100
  );

  function handleIncreaseFontSize(): void {
    setFontSize((prevFontSize) => {
      const value = prevFontSize + 5;
      localStorage.setItem("fontSize", value.toString());
      return value;
    });
  }

  function handleDecreaseFontSize(): void {
    setFontSize((prevFontSize) => {
      const value = prevFontSize - 5;
      localStorage.setItem("fontSize", value.toString());
      return value;
    });
  }

  function handleHightConstast(): void {
    setBackgroundColor((prevBackgroundColor) => {
      const newBackgroundColor =
        prevBackgroundColor === "#000000" ? "#f5f5f5" : "#000000";
      localStorage.setItem("backgroundColor", newBackgroundColor);
      return newBackgroundColor;
    });

    setTextColor((prevTextColor) => {
      const newTextColor = prevTextColor === "#ffffff" ? "#000000" : "#ffffff";
      localStorage.setItem("textColor", newTextColor);
      return newTextColor;
    });

    setButtonHoverColorWeight((prevButtonHoverColorWeight) => {
      const newButtonHoverColorWeight =
        prevButtonHoverColorWeight === "800" ? "200" : "800";
      localStorage.setItem("buttonHoverColorWeight", newButtonHoverColorWeight);
      return newButtonHoverColorWeight;
    });
  }

  function handleOpenProfileMenu(): void {
    onOpen();
  }

  function handleProfile(): void {
    navigate("/profile");
  }

  function handleLogout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  useEffect(() => {
    styleContext.dispatch({
      type: "SET_STYLE",
      payload: { fontSize, backgroundColor, textColor, buttonHoverColorWeight },
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    backgroundColor,
    buttonHoverColorWeight,
    fontSize,
    styleContext.dispatch,
    textColor,
  ]);

  useEffect(() => {
    hotkeyContext.dispatch({
      type: "SET_HOTKEY",
      payload: {
        "-": () => handleDecreaseFontSize(),
        "+": () => handleIncreaseFontSize(),
        C: () => handleHightConstast(),
        F: () => handleProfile(),
        L: () => handleLogout(),
        M: () => handleOpenProfileMenu(),
      },
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex space-x-2 md:space-x-4 items-center">
      <button
        title="Autocontraste [c]"
        aria-describedby="Autocontraste"
        className={`hover:bg-gray-${styleContext.state.buttonHoverColorWeight} rounded-xl p-4`}
        onClick={handleHightConstast}
        style={{ fontSize: "24px" }}
      >
        <div className="flex space-x-2 items-center">
          <MdContrast size={32} />{" "}
          <span className="text-sm">
            <SL>C</SL>
          </span>
        </div>
      </button>
      <button
        title="Ação de aumentar tamanho do texto [+]"
        aria-describedby="Ação de aumentar tamanho do texto"
        className={`hover:bg-gray-${styleContext.state.buttonHoverColorWeight} rounded-xl p-4`}
        onClick={handleIncreaseFontSize}
        style={{ fontSize: "24px" }}
      >
        A+
      </button>
      <button
        title="Ação de aumentar diminuir do texto [-]"
        aria-describedby="Ação de aumentar diminuir do texto"
        className={`hover:bg-gray-${styleContext.state.buttonHoverColorWeight} rounded-xl p-4`}
        onClick={handleDecreaseFontSize}
        style={{ fontSize: "24px" }}
      >
        A-
      </button>
      {isAuthenticated && window.innerWidth >= 768 && (
        <div className="flex items-center">
          <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={
                <>
                  <BsPerson size={28} />
                </>
              }
              onClick={onOpen}
            />

            <MenuList bgColor={styleContext.state.backgroundColor}>
              <MenuItem
                onClick={handleProfile}
                bgColor={styleContext.state.backgroundColor}
                textAlign={"center"}
              >
                <span className="mr-2">Perfil</span>
                <div>
                  <SL>F</SL>
                </div>
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                bgColor={styleContext.state.backgroundColor}
              >
                <span className="mr-2">Sair</span>
                <div>
                  <SL>L</SL>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <span className="text-sm font-normal ml-1">
            <SL>M</SL>
          </span>
        </div>
      )}
    </div>
  );
}

export default AccessibilityMenu;
