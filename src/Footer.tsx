import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";

function Footer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <footer className="fixed bottom-0 mx-auto w-full text-center py-4 px-6">
      <div className="flex flex-wrap">
        <div className="flex justify-center space-x-4 text-indigo-600 ">
          <a href="https://www.mamao.dev.br">Sobre [S]</a> <span>•</span>
          <a href="/#">Ajuda [H]</a> <span>•</span>
          <a onClick={onOpen} className="cursor-pointer">
            Privacidade [P]
          </a>{" "}
          <span>•</span>
          <a href="/#">Feedback [F]</a>
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm">Versão alfa-0.0</div>
      </div>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(6px)" />
        <ModalContent borderRadius="1rem">
          <ModalHeader>
            <div className="pt-6 flex justify-center">
              <h1>Termos de Privacidade</h1>
            </div>
          </ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody
            className="flex-col space-y-2 mx-6 mb-6 text-sm"
            style={{
              overflowY: "auto",
              maxHeight: "500px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(155, 155, 155, 0.7) transparent",
            }}
            css={{
              "&::-webkit-scrollbar": {
                width: "6px",
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
            <h3>
              <b>Última Atualização: 06 de Junho de 2023</b>
            </h3>
            <section>
              Este documento descreve como a Associação de Inovação em
              Acessibilidade Computacional ("AIAC") coleta, usa, compartilha e
              protege as informações pessoais que você nos fornece através do
              nosso aplicativo, onde coletamos vídeos de usuários para um banco
              de dados público de linguagem de sinais. Por favor, leia estes
              Termos de Privacidade cuidadosamente. Ao utilizar o nosso
              aplicativo, você concorda com a coleta, o uso e a divulgação de
              suas informações pessoais (conforme definido neste documento) de
              acordo com estes Termos de Privacidade.
            </section>
            <h2>
              <b>1. Informações que Coletamos</b>
            </h2>
            <section>
              Nós coletamos informações que são coletadas automaticamente
              através do uso de nossa aplicação web. Isso inclui vídeos dos
              usuários, bem como informações demográficas para garantir a
              diversidade da nossa base de dados, incluindo, mas não se
              limitando a, idade, gênero, etnia e localização geográfica.
            </section>
            <h2>
              <b>2. Como Usamos suas Informações</b>
            </h2>
            <section>
              Usamos suas informações para os seguintes fins:
              <ol className="list-decimal ml-4 mt-2">
                <li>Para fornecer, manter e melhorar nossa aplicação web. </li>
                <li>
                  Para desenvolver e aprimorar nosso banco de dados público de
                  linguagem de sinais.
                </li>
                <li>Para responder às suas perguntas e solicitações. </li>
                <li>
                  Para garantir que a base de dados coletada seja diversificada,
                  compreendendo diferentes tipos de pessoas.{" "}
                </li>
                <li>
                  Para comunicar-se com você sobre atualizações da aplicação web
                  e outros assuntos de interesse do usuário.
                </li>
              </ol>
            </section>
            <h2>
              <b>3. Compartilhamento de Informações</b>
            </h2>
            <section>
              Nós não compartilhamos suas informações pessoais com terceiros,
              exceto nas seguintes circunstâncias: Quando temos o seu
              consentimento para fazê-lo. Quando necessário para cumprir
              qualquer lei, regulamento ou solicitação legal. Os dados coletados
              poderão ser baixados em duas formas: Dados de marco de estimativa
              de pose dos vídeos coletados, que garantem maior privacidade; e
              dados dos vídeos, nesse caso, quem baixar terá que assinar um
              termo de responsabilidade se comprometendo a não compartilhar
              publicamente esses dados sem autorização prévia da pessoa em
              questão.
            </section>
            <h2>
              <b>4. Segurança</b>
            </h2>
            <section>
              Tomamos medidas para proteger suas informações contra perda,
              roubo, uso indevido e acesso não autorizado. No entanto, nenhuma
              transmissão de dados pela internet é 100% segura, portanto, não
              podemos garantir a segurança absoluta de suas informações.
            </section>
            <h2>
              <b>5. Acesso, Atualização e Exclusão de suas Informações</b>
            </h2>
            <section>
              Você tem o direito de acessar, atualizar, corrigir e excluir suas
              informações a qualquer momento. Se você deseja exercer esse
              direito, entre em contato conosco através das informações de
              contato fornecidas abaixo. As pessoas que baixaram os vídeos serão
              notificadas para excluírem também, porém não temos como garantir
              que o façam.
            </section>
            <h2>
              <b>6. Mudanças nesta Política</b>
            </h2>
            <section>
              Podemos atualizar nossa política de privacidade periodicamente. Se
              fizermos alterações que modifiquem substancialmente a forma como
              usamos suas informações pessoais, iremos notificá-lo por e-mail ou
              através de um aviso na aplicação web.
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </footer>
  );
}

export default Footer;
