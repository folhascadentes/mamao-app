import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import handshapeOne from "./assets/handshapeOne.png";
import handshapeTwo from "./assets/handshapeTwo.png";
import handshapeThree from "./assets/handshapeThree.png";
import movement from "./assets/movement.png";
import orientation from "./assets/orientation.png";
import location from "./assets/location.png";

function Instructions({
  startRecording,
}: {
  startRecording: () => void;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = React.useState(0);
  const finalRef = React.useRef(null);
  const title = [
    "Língua de sinal",
    "Configuração da mão",
    "Movimento",
    "Localização",
    "Orientação da mão",
    "Juntando tudo!",
  ];
  const gradientBg = css({
    background: `linear-gradient(to top, white, white, #FFF5E8)`,
  });

  function nextState() {
    setState((value) => value + 1);
  }

  function previousState() {
    setState((value) => value - 1);
  }

  return (
    <div className="p-6 flex justify-center md:text-lg font-normal">
      <div style={{ width: "720px" }}>
        <h1 className="text-3xl md:text-4xl text-center mb-6 md:mb-10">
          Olá, <span className="text-orange-600 md:font-light">Voluntário</span>
          !
        </h1>
        <p className="text-left mb-2">
          Agradecemos por se tornar um voluntário e nos dar{" "}
          <span className="text-orange-600 font-bold">uma mão</span>. Antes de
          começar, leia e siga as instruções abaixo:
        </p>
        <ol className="list-decimal text-left ml-4 mt-4 mb-10">
          <li className="mb-2">
            Encerre programas pesados no seu computador para melhorar o
            desempenho da plataforma. Ela utiliza inteligência artificial para
            analisar e auxiliar na sinalização de Libras, além de capturar
            vídeos automaticamente.
          </li>
          <li className="mb-2">
            Certifique-se de que apenas você apareça no vídeo e que esteja
            visível da cintura para cima.
          </li>
          <li className="mb-2">
            Permita o acesso à câmera na plataforma, garantindo seu correto
            funcionamento.
          </li>
          <li>
            Siga as instruções exibidas na tela para concluir os passos com
            sucesso.
          </li>
        </ol>
        <div className="text-center">
          <button
            type="button"
            onClick={onOpen}
            className="bg-indigo-600 text-white py-6 px-8 text-2xl rounded-xl mb-10"
          >
            Começar <span className="text-base">[C]</span>
          </button>
        </div>
      </div>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent css={gradientBg} borderRadius="1rem">
          <ModalHeader>
            <div className="pt-6 pb-8">
              {state === 1 && (
                <div className="flex justify-center space-x-12 px-6">
                  <img
                    src={handshapeOne}
                    alt="Handshape One"
                    style={{ height: "125px" }}
                  />
                  <img
                    src={handshapeTwo}
                    alt="Handshape Two"
                    style={{ height: "125px" }}
                  />
                  <img
                    src={handshapeThree}
                    alt="Handshape Three"
                    style={{ height: "125px" }}
                  />
                </div>
              )}
              {state === 2 && (
                <div className="flex justify-center">
                  <img
                    src={movement}
                    alt="Movement"
                    style={{ height: "200px" }}
                  />
                </div>
              )}
              {state === 3 && (
                <div className="flex justify-center">
                  <img
                    src={location}
                    alt="Location"
                    style={{ height: "200px" }}
                  />
                </div>
              )}
              {state === 4 && (
                <div className="flex justify-center">
                  <img
                    src={orientation}
                    alt="Orientation"
                    style={{ height: "200px" }}
                  />
                </div>
              )}
            </div>
            <span className="flex text-3xl font-normal justify-center">
              {title[state]}
            </span>
          </ModalHeader>
          <ModalBody className="mx-6">
            <div className="md:text-lg font-normal mt-4 mb-6">
              {state === 0 && (
                <div>
                  Libras é uma linguagem completa e complexa, tão rica e variada
                  quanto qualquer linguagem falada. A principal diferença é que
                  em vez de usar sons e palavras, usamos nossas mãos, expressões
                  faciais e corpos para comunicar.
                  <br></br>
                  <br></br>
                  Existem quatro componentes principais em cada sinal de Libras:
                  a{" "}
                  <b>
                    configuração da mão, o movimento, a localização e a
                    orientação da mão
                  </b>
                  . Juntos, esses componentes criam um sinal com um significado
                  especial. Vamos explorar cada um deles.
                </div>
              )}
              {state === 1 && (
                <div>
                  A configuração da mão é a posição específica em que sua mão
                  está para formar um sinal. Pode ser uma mão aberta, um punho
                  fechado, um dedo apontado ou uma de muitas outras formas
                  possíveis.{" "}
                  <b>
                    Cada configuração tem um significado diferente e pode ser
                    comparada a diferentes letras ou palavras
                  </b>
                  .
                </div>
              )}
              {state === 2 && (
                <div>
                  O movimento é a ação realizada pela mão para transmitir o
                  sinal. As mãos podem se mover para cima, para baixo, para a
                  esquerda, para a direita, ou até mesmo fazer um movimento
                  circular.<br></br>
                  <br></br>Alguns sinais envolvem um movimento pequeno e sutil,
                  enquanto outros envolvem um movimento grande e dinâmico.{" "}
                  <b>
                    A especificidade do movimento é crucial para o significado
                    do sinal
                  </b>
                  .
                </div>
              )}
              {state === 3 && (
                <div>
                  A localização se refere ao lugar no corpo ou no espaço onde o
                  sinal é feito. Alguns sinais são feitos perto do rosto, outros
                  perto do peito, e outros em várias partes do espaço ao redor
                  do corpo.{" "}
                  <b>A localização de um sinal pode mudar seu significado</b>.
                </div>
              )}
              {state === 4 && (
                <div>
                  A orientação da mão é a direção em que a palma ou o dorso da
                  sua mão está voltada durante um sinal. Em alguns sinais, a
                  palma da mão pode estar voltada para você, enquanto em outros,
                  pode estar voltada para fora, para cima ou para baixo.{" "}
                  <b>
                    A orientação da mão também é um componente crucial para o
                    significado do sinal
                  </b>
                  .
                </div>
              )}
              {state === 5 && (
                <div>
                  Quando a configuração da mão, o movimento, a localização e a
                  orientação da mão se combinam, eles criam um sinal único em
                  Libras.{" "}
                  <b>
                    Assim como palavras formam frases em uma linguagem falada,
                    os sinais em Libras se combinam para expressar pensamentos e
                    ideias
                  </b>
                  .<br></br>
                  <br></br> Lembre-se disso quando estiver aprendendo e usando
                  Libras - você está aprendendo uma nova maneira de expressar e
                  comunicar suas ideias e sentimentos!
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            {state > 0 && (
              <Button mr={6} mb={6} onClick={previousState}>
                Anterior [a]
              </Button>
            )}
            {state < 5 && (
              <Button
                className="bg-indigo-600"
                mr={3}
                mb={6}
                onClick={nextState}
              >
                Próximo [p]
              </Button>
            )}
            {state === 5 && (
              <Button
                className="bg-indigo-600"
                mr={3}
                mb={6}
                onClick={startRecording}
              >
                Começar [c]
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Instructions;
