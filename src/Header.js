import React from "react";
import papayaLogo from "./assets/papaya.png";

function Header() {
  return (
    <header className="w-full bg-papaya-500">
      <div className="container mx-auto px-4 py-4 flex space-x-4 justify-between items-center">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <img src={papayaLogo} alt="Papaya Logo" className="h-20" />
        </div>
      </div>
    </header>
  );
}

export default Header;
