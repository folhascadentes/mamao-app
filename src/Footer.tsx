import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { StyleContext } from "./reducers/style.reducer";
import { HotkeyContext } from "./reducers/hotkeys.reducer";
import TermsPrivacyUseModal from "./modals/terms-privacy-use.modal";
import { SL } from "./components";

function Footer(): JSX.Element {
  const { state } = useContext(StyleContext);
  const hotkeyContext = useContext(HotkeyContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    hotkeyContext.dispatch({
      type: "SET_HOTKEY",
      payload: {
        P: () => onOpen(),
        S: () => window.open("https://www.mamao.dev.br"),
        W: () => window.open("https://app.mamao.dev.br/who-is-aiac"),
      },
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <footer
      className="fixed bottom-0 mx-auto w-full text-center py-4 px-6"
      style={{ backgroundColor: state.backgroundColor }}
    >
      {window.innerWidth > 768 && (
        <div className="flex flex-wrap">
          <div className="flex justify-center space-x-4 text-indigo-500 font-bold">
            <a href="https://www.mamao.dev.br" rel="noreferrer" target="_blank">
              Sobre o projeto <SL>S</SL>
            </a>{" "}
            <span>•</span>
            <a
              href="https://app.mamao.dev.br/who-is-aiac"
              rel="noreferrer"
              target="_blank"
            >
              Sobre nós <SL>W</SL>
            </a>{" "}
            <span>•</span>
            {/* eslint-disable-next-line */}
            <a href="#" onClick={onOpen} className="cursor-pointer">
              Privacidade e Uso <SL>P</SL>
            </a>
          </div>
          <div className="flex-grow"></div>
          <div className="text-sm">Versão beta-0.0.0</div>
        </div>
      )}

      <TermsPrivacyUseModal isOpen={isOpen} onClose={onClose} />
    </footer>
  );
}

export default Footer;
