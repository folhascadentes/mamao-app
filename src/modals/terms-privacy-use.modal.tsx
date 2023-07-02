import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import privacy from "../assets/privacy.webp";
import { StyleContext } from "../reducers/style.reducer";
import TermsContent from "./terms-content";

function TermsPrivacyUseModal({
  isMobile = false,
  isOpen,
  onClose,
}: {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  const { state } = useContext(StyleContext);

  const finalRef = useRef(null);

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={isMobile ? "full" : "xl"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(6px)" />
      <ModalContent
        borderRadius={isMobile ? "0rem" : "1rem"}
        css={{ backgroundColor: state.backgroundColor }}
      >
        <ModalHeader>
          <div className="flex justify-center pt-6">
            <img
              src={privacy}
              alt=""
              style={{
                height: window.innerHeight <= 800 ? "100px" : "125px",
              }}
            />
          </div>
          <div className="pt-6 flex justify-center">
            <h1>Termos de Privacidade e Uso</h1>
          </div>
        </ModalHeader>
        <ModalCloseButton size={"lg"}></ModalCloseButton>
        <ModalBody
          className="flex-col space-y-2 mx-6 mb-10 text-sm"
          style={{
            overflowY: "scroll",
            maxHeight: isMobile ? "540px" : "425px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(155, 155, 155, 0.7) transparent",
          }}
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(155, 155, 155, 0.7)",
              borderRadius: "20px",
              border: "1px solid transparent",
              backgroundClip: "content-box",
            },
          }}
        >
          <TermsContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TermsPrivacyUseModal;
