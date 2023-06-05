import React, { useState } from "react";
import papaya3d from "./assets/papaya3d.jpeg";

function Header(): JSX.Element {
  const [fontSize, setFontSize] = useState<number>(100);

  function handleIncreaseFontSize(): void {
    setFontSize(fontSize + 10);
  }

  function handleDecreaseFontSize(): void {
    setFontSize(fontSize - 10);
  }

  return (
    <header className="w-full">
      <style>{`html {font-size: ${fontSize}%; }`}</style>
      <div className="container mx-auto px-4 py-4 flex space-x-4 justify-between items-center">
        <div className="w-44"></div>
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <img src={papaya3d} alt="" style={{ height: "80px" }} />
        </div>
        <button
          title="Ação de aumentar tamanho do texto [+]"
          aria-describedby="Ação de aumentar tamanho do texto"
          className={`hover:bg-gray-200 rounded-xl p-4`}
          onClick={handleIncreaseFontSize}
          style={{ fontSize: "24px" }}
        >
          A+
        </button>
        <button
          title="Ação de aumentar diminuir do texto [-]"
          aria-describedby="Ação de aumentar diminuir do texto"
          className={`hover:bg-gray-200 rounded-xl p-4`}
          onClick={handleDecreaseFontSize}
          style={{ fontSize: "24px" }}
        >
          A-
        </button>
      </div>
    </header>
  );
}

export default Header;
