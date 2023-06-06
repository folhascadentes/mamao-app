import React from "react";

function Footer(): JSX.Element {
  return (
    <footer className="fixed bottom-0 mx-auto w-full text-center py-4 px-6">
      <div className="flex flex-wrap">
        <div className="flex justify-center space-x-4 text-indigo-600 ">
          <a href="https://www.mamao.dev.br">Sobre [S]</a> <span>•</span>
          <a href="/#">Ajuda [H]</a> <span>•</span>
          <a href="/#">Privacidade [P]</a> <span>•</span>
          <a href="/#">Feedback [F]</a>
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm">Versão alfa-0.0</div>
      </div>
    </footer>
  );
}

export default Footer;
