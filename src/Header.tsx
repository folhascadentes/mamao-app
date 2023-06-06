import React, { useState } from "react";
import { MdContrast } from "react-icons/md";
import papaya3d from "./assets/papaya3d.jpeg";

function Header({
  textColor,
  backgroundColor,
  buttonHoverColorWeight,
  setBackgroundColor,
  setTextColor,
  setButtonHoverColorWeight,
}: {
  textColor: string;
  backgroundColor: string;
  buttonHoverColorWeight: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setButtonHoverColorWeight: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [fontSize, setFontSize] = useState<number>(
    localStorage.getItem("fontSize")
      ? Number(localStorage.getItem("fontSize"))
      : 100
  );

  function handleIncreaseFontSize(): void {
    setFontSize((fontSize) => {
      const value = fontSize + 10;
      localStorage.setItem("fontSize", value.toString());
      return value;
    });
  }

  function handleDecreaseFontSize(): void {
    setFontSize((fontSize) => {
      const value = fontSize - 10;
      localStorage.setItem("fontSize", value.toString());
      return value;
    });
  }

  function handleHightConstast(): void {
    setBackgroundColor((bg) => {
      const value = bg === "#000000" ? "#f5f5f5" : "#000000";
      localStorage.setItem("backgroundColor", value);
      return value;
    });
    setTextColor((text) => {
      const value = text === "#ffffff" ? "#000000" : "#ffffff";
      localStorage.setItem("textColor", value);

      return value;
    });
    setButtonHoverColorWeight((weight) => {
      const value = weight === "800" ? "200" : "800";
      localStorage.setItem("buttonHoverColorWeight", value);
      return value;
    });
  }

  return (
    <>
      <style>{`html { font-size: ${fontSize}%; } body {color: ${textColor}; background-color: ${backgroundColor}; }`}</style>
      <header className="w-full">
        <div className="container mx-auto px-4 py-4 flex space-x-4 justify-between items-center">
          <div className="w-80"></div>
          <div className="container mx-auto px-4 py-4 flex justify-center items-center">
            <img src={papaya3d} alt="" style={{ height: "80px" }} />
          </div>
          <button
            title="Autocontraste [c]"
            aria-describedby="Autocontraste"
            className={`hover:bg-gray-${buttonHoverColorWeight} rounded-xl p-4`}
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
            className={`hover:bg-gray-${buttonHoverColorWeight} rounded-xl p-4`}
            onClick={handleIncreaseFontSize}
            style={{ fontSize: "24px" }}
          >
            A+
          </button>
          <button
            title="Ação de aumentar diminuir do texto [-]"
            aria-describedby="Ação de aumentar diminuir do texto"
            className={`hover:bg-gray-${buttonHoverColorWeight} rounded-xl p-4`}
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
