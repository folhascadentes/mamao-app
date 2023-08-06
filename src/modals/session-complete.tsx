import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { StyleContext } from "../reducers/style.reducer";
import congratulations from "../assets/congratulations.webp";

function SessionComplete({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
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
      size="md"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(6px)" />
      <ModalContent
        borderRadius="1rem"
        css={{ backgroundColor: state.backgroundColor }}
      >
        <ModalHeader>
          <div className="flex justify-center pt-6">
            <img
              src={congratulations}
              alt=""
              style={{
                height: window.innerHeight <= 800 ? "125px" : "155px",
              }}
            />
          </div>
          <div className="pt-6 flex justify-center">
            <h1>Parabéns!</h1>
          </div>
        </ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody className="flex-col space-y-2 mx-6 mb-10">
          <div className="mb-4">
            Você completou a sessão e fez a diferença em tornar o mundo mais
            inclusivo
          </div>
          <div className="mb-4">
            Você pode ver o seu progresso na página de perfil.
          </div>
          <div>
            Caso queira realizar uma nova sessão aperte <b>"Começar"</b>{" "}
            novamente.
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SessionComplete;
