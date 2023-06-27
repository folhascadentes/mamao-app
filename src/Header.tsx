import React, { useContext, useEffect, useState } from "react";
import { MdContrast } from "react-icons/md";
import papaya3d from "./assets/papaya3d.jpeg";
import { StyleContext } from "./reducers/style.reducer";

function Header({
  setHotKeys,
}: {
  setHotKeys: (keyMap: any, handlers: any) => void;
}): JSX.Element {
  const { state, dispatch } = useContext(StyleContext);
  const [backgroundColor, setBackgroundColor] = useState(state.backgroundColor);
  const [textColor, setTextColor] = useState(state.textColor);
  const [buttonHoverColorWeight, setButtonHoverColorWeight] = useState(
    state.buttonHoverColorWeight
  );
  const [fontSize, setFontSize] = useState<number>(
    localStorage.getItem("fontSize")
      ? Number(localStorage.getItem("fontSize"))
      : 100
  );

  useEffect(() => {
    setHotKeys(
      {
        INCREASE_FONT_SIZE: "+",
        DECREASE_FONT_SIZE: "-",
        HIGH_CONTRAST: "c",
      },
      {
        INCREASE_FONT_SIZE: () => handleIncreaseFontSize(),
        DECREASE_FONT_SIZE: () => handleDecreaseFontSize(),
        HIGH_CONTRAST: () => handleHightConstast(),
      }
    );
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

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

  useEffect(() => {
    dispatch({
      type: "SET_STYLE",
      payload: { backgroundColor, textColor, buttonHoverColorWeight },
    });
  }, [backgroundColor, textColor, buttonHoverColorWeight, dispatch]);

  return (
    <>
      <style>{`html { font-size: ${fontSize}%; } body {color: ${state.textColor}; background-color: ${state.backgroundColor}; }`}</style>
      <header className="w-full">
        <div className="container mx-auto px-4 py-4 flex space-x-4 justify-between items-center">
          <div className="w-80"></div>
          <div className="container mx-auto px-4 py-4 flex justify-center items-center">
            <img src={papaya3d} alt="" style={{ height: "80px" }} />
          </div>
          <button
            title="Autocontraste [c]"
            aria-describedby="Autocontraste"
            className={`hover:bg-gray-${state.buttonHoverColorWeight} rounded-xl p-4`}
            onClick={handleHightConstast}
            style={{ fontSize: "24px" }}
          >
            <div className="flex space-x-2">
              <MdContrast size={32} />{" "}
              <span className="text-sm hidden md:inline">[C]</span>
            </div>
          </button>
          <button
            title="Ação de aumentar tamanho do texto [+]"
            aria-describedby="Ação de aumentar tamanho do texto"
            className={`hover:bg-gray-${state.buttonHoverColorWeight} rounded-xl p-4`}
            onClick={handleIncreaseFontSize}
            style={{ fontSize: "24px" }}
          >
            A+
          </button>
          <button
            title="Ação de aumentar diminuir do texto [-]"
            aria-describedby="Ação de aumentar diminuir do texto"
            className={`hover:bg-gray-${state.buttonHoverColorWeight} rounded-xl p-4`}
            onClick={handleDecreaseFontSize}
            style={{ fontSize: "24px" }}
          >
            A-
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
