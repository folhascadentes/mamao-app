import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import camera from "../assets/camera.png";

function EnableCameraModal({
  backgroundColor,
  isOpen,
  onOpen,
  onClose,
}: {
  backgroundColor: "#f5f5f5" | "#000000";
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}): JSX.Element {
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
      <ModalContent borderRadius="1rem" css={{ backgroundColor }}>
        <ModalHeader>
          <div className="flex justify-center pt-6">
            <img
              src={camera}
              alt=""
              style={{
                height: window.innerHeight <= 800 ? "125px" : "155px",
              }}
            />
          </div>
          <div className="pt-6 flex justify-center">
            <h1>Configuração necessária</h1>
          </div>
        </ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody className="flex-col space-y-2 mx-6 mb-10">
          <div className="mb-4">
            Câmera não detectada. Por favor, habilite e configure sua câmera
            para continuar
          </div>
          <b>Configurações do Navegador &gt; Privacidade &gt; Câmera</b>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EnableCameraModal;
