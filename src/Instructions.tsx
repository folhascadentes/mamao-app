import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import { useRef, useState } from "react";
import signLanguage from "./assets/signLanguage.jpeg";
import handshapeOne from "./assets/handshapeOne.jpeg";
import handshapeTwo from "./assets/handshapeTwo.jpeg";
import handshapeThree from "./assets/handshapeThree.jpeg";
import movement from "./assets/movement.jpeg";
import orientation from "./assets/orientation.jpeg";
import location from "./assets/location.jpeg";
import wrapping from "./assets/wrapping.jpeg";

function Instructions({
  startRecording,
  buttonHoverColorWeight,
}: {
  startRecording: () => void;
  buttonHoverColorWeight: string;
}): JSX.Element {
  const showTutorial: boolean = !localStorage.getItem("tutorialViewed");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState(0);
  const finalRef = useRef(null);
  const title = [
    "Língua de sinal",
    "Configuração da mão",
    "Movimento",
    "Localização",
    "Orientação da mão",
    "Juntando tudo!",
  ];
  const gradientBg = css({
    background: "linear-gradient(to top, #262525, black, black, #332f2f)", // "linear-gradient(to top, #dff5ed, white, white, #ffecd4)",
  });

  function nextState() {
    setState((value) => value + 1);
  }
  function previousState() {
    setState((value) => value - 1);
  }

  function start() {
    if (showTutorial) {
      onOpen();
    } else {
      startRecording();
    }
  }

  function begin() {
    startRecording();
    localStorage.setItem("tutorialViewed", "true");
    onClose();
  }

  return (
    <div className="px-6 xl:p-6 flex justify-center xl:text-lg font-normal">
      <div style={{ width: "720px" }}>
        <h1 className="text-3xl xl:text-4xl text-center mb-6 md:mb-10">
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
            onClick={start}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-5 xl:py-6 px-8 text-xl xl:text-2xl rounded-xl mb-10"
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
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(6px)" />
        <ModalContent css={gradientBg} borderRadius="1rem">
          <ModalHeader>
            <div className="pt-6 pb-8">
              {state === 0 && (
                <div className="flex justify-center">
                  <img
                    src={signLanguage}
                    alt=""
                    style={{
                      height: window.innerHeight <= 800 ? "150px" : "200px",
                    }}
                  />
                </div>
              )}
              {state === 1 && (
                <div className="flex justify-center space-x-12 px-6">
                  <img src={handshapeOne} alt="" style={{ height: "125px" }} />
                  <img src={handshapeTwo} alt="" style={{ height: "125px" }} />
                  <img
                    src={handshapeThree}
                    alt=""
                    style={{ height: "125px" }}
                  />
                </div>
              )}
              {state === 2 && (
                <div className="flex justify-center">
                  <img
                    src={movement}
                    alt=""
                    style={{
                      height: window.innerHeight <= 800 ? "150px" : "200px",
                    }}
                  />
                </div>
              )}
              {state === 3 && (
                <div className="flex justify-center">
                  <img
                    src={location}
                    alt=""
                    style={{
                      height: window.innerHeight <= 800 ? "150px" : "200px",
                    }}
                  />
                </div>
              )}
              {state === 4 && (
                <div className="flex justify-center">
                  <img
                    src={orientation}
                    alt=""
                    style={{
                      height: window.innerHeight <= 800 ? "150px" : "200px",
                    }}
                  />
                </div>
              )}
              {state === 5 && (
                <div className="flex justify-center">
                  <img
                    src={wrapping}
                    alt=""
                    style={{
                      height: window.innerHeight <= 800 ? "150px" : "200px",
                    }}
                  />
                </div>
              )}
            </div>
            <h1 className="flex text-2xl xl:text-3xl font-normal justify-center">
              {title[state]}
            </h1>
          </ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody className="mx-6">
            <div className=" xl:text-lg font-normal xl:mt-4 xl:mb-6">
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
                  <br></br> Lembre-se disso quando estiver sinalizando, siga as
                  instruções presentes no canto esquerdo da tela. Juntos podemos
                  fazer o mundo mais inclusivo!
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            {state > 0 && (
              <button
                type="button"
                className={`bg-transparent hover:bg-neutral-${buttonHoverColorWeight} py-3.5 px-6 text-lg rounded-xl mr-6 mb-6`}
                onClick={previousState}
              >
                Anterior [A]
              </button>
            )}
            {state < 5 && (
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-6 text-lg rounded-xl mr-3 mb-6"
                onClick={nextState}
              >
                Próximo [D]
              </button>
            )}
            {state === 5 && (
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-6 text-lg rounded-xl mr-3 mb-6"
                onClick={begin}
              >
                Começar [C]
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Instructions;
