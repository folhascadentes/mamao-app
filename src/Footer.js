import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 bg-neutral-100 mx-auto w-full text-center py-4 px-6">
      <div className="flex flex-wrap">
        <div className="flex justify-center space-x-4 text-blue-800 ">
          <a href="/#">Sobre</a> <span>•</span>
          <a href="/#">Ajuda</a> <span>•</span>
          <a href="/#">Privacidade</a> <span>•</span>
          <a href="/#">Feedback</a>
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm">Versão alfa-0.0</div>
      </div>
    </footer>
  );
}

export default Footer;
