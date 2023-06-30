import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { StyleContext } from "./reducers/style.reducer";
import { HotkeyContext } from "./reducers/hotkeys.reducer";
import TermsPrivacyUseModal from "./modals/terms-privacy-use.modal";

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
          <div className="flex justify-center space-x-4 text-indigo-600 ">
            <a href="https://www.mamao.dev.br" rel="noreferrer" target="_blank">
              Sobre [S]
            </a>{" "}
            <span>•</span>
            {/* eslint-disable-next-line */}
            <a href="#" onClick={onOpen} className="cursor-pointer">
              Privacidade e Uso [P]
            </a>
          </div>
          <div className="flex-grow"></div>
          <div className="text-sm">Versão alfa-0.0</div>
        </div>
      )}

      <TermsPrivacyUseModal isOpen={isOpen} onClose={onClose} />
    </footer>
  );
}

export default Footer;
