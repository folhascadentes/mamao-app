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
          <h3>
            <b>Última Atualização: 30 de Junho de 2023</b>
          </h3>
          <section>
            Olá! Somos a Associação de Inovação em Acessibilidade Computacional
            (AIAC), também conhecida como Folhas Cadentes. Estamos fazendo um
            projeto para ajudar pessoas que usam a língua de sinais. Para isso,
            estamos pedindo que as pessoas nos enviem vídeos fazendo sinais.
            Nesta página, vamos explicar como usamos os vídeos e outras
            informações que você nos dá. Ao usar nosso aplicativo, você está
            concordando com o que explicamos aqui.
          </section>
          <section>Por favor, leia tudo com atenção.</section>

          <h1 className="text-xl">
            <b>Termos de privacidade</b>
          </h1>
          <h2>
            <b>1. Informações que Coletamos</b>
          </h2>
          <section>
            Nós coletamos vídeos que você nos manda através do nosso aplicativo.
            Também pedimos algumas informações sobre você, como sua idade,
            gênero, cor da pele e onde você vive. Isso ajuda a gente a entender
            melhor quem está usando a língua de sinais.
          </section>
          <h2>
            <b>2. Como Usamos suas Informações</b>
          </h2>
          <section>
            Nós usamos os vídeos e as informações que você nos dá para várias
            coisas:
            <ol className="list-decimal ml-4 mt-2">
              <li>Para fornecer, manter e melhorar nossa aplicação web. </li>
              <li>
                Para desenvolver e aprimorar nosso banco de dados público de
                língua de sinais.
              </li>
              <li>
                Para garantir que a base de dados coletada seja diversificada,
                compreendendo diferentes tipos de pessoas. Você pode saber mais
                sobre porque precisamos de dados diversificados acessando a
                página{" "}
                <a
                  className="hover:text-indigo-600 text-indigo-500 font-bold"
                  href="/database-diversity-importance"
                >
                  Por que precisamos de diferentes tipos de dados para fazer um
                  bom tradutor de Língua de Sinais
                </a>
              </li>
              <li>
                Para comunicar-se com você sobre atualizações da aplicação web e
                outros assuntos de interesse do usuário.
              </li>
            </ol>
          </section>
          <h2>
            <b>3. Compartilhamento de Informações</b>
          </h2>
          <section>
            Nós não damos suas informações para outras pessoas, a menos que você
            nos permita ou que a lei nos obrigue. Mas vamos permitir que outras
            pessoas baixem os vídeos. Quem baixar os vídeos terá que assinar um
            termo de compromisso que vai usar os vídeos de maneira correta,
            porém ao usar o aplicativo você concorda em compartilhar os vídeos
            com outras pessoas.
          </section>
          <h2>
            <b>4. Segurança</b>
          </h2>
          <section>
            Tomamos medidas para proteger suas informações contra perda, roubo,
            uso indevido e acesso não autorizado. No entanto, nenhuma
            transmissão de dados pela internet é 100% segura, portanto, não
            podemos garantir a segurança absoluta de suas informações.
          </section>
          <h2>
            <b>5. Acesso, Atualização e Exclusão de suas Informações</b>
          </h2>
          <section>
            Você tem o direito de ver, mudar, corrigir e apagar suas
            informações. Se quiser fazer isso, por favor, nos mande uma
            mensagem. Se você pedir para apagar suas informações, vamos avisar
            as pessoas que baixaram os vídeos para fazerem o mesmo. Mas não
            temos como garantir que elas vão fazer isso.
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
          <h1 className="text-xl">
            <b>Termos de uso</b>
          </h1>
          <p>
            Bem-vindo ao nosso aplicativo! Para usar nosso aplicativo, você
            precisa concordar com estes Termos de Uso. Por favor, leia-os com
            atenção.
          </p>
          <h2>
            <b>1. Uso do Aplicativo</b>
          </h2>
          <section>
            Nosso aplicativo tem como objetivo primário a formação de uma base
            de dados, que servirá para ajudar pessoas a entender a língua de
            sinais. Você pode usar o aplicativo para mandar vídeos fazendo
            sinais e para baixar vídeos que outras pessoas mandaram. Você tem
            que usar nosso aplicativo de maneira correta e legal. Não pode usar
            o aplicativo para fazer coisas ruins ou ilegais.
          </section>
          <h2>
            <b>2. Vídeos e Informações</b>
          </h2>
          <section>
            Quando você manda um vídeo ou dá uma informação para nós, você está
            nos dando permissão para usar o vídeo ou a informação da maneira que
            explicamos na nossa Política de Privacidade. Você está nos
            garantindo que tem o direito de dar essa permissão.
          </section>
          <h2>
            <b>3. Baixando Vídeos</b>
          </h2>
          <section>
            Se você baixar um vídeo, você tem que usar o vídeo de maneira
            correta e legal. Você não pode compartilhar o vídeo sem a permissão
            da pessoa que está no vídeo. E você tem que concordar em apagar o
            vídeo se a pessoa que está no vídeo pedir.
          </section>
          <h2>
            <b>4. Responsabilidade</b>
          </h2>
          <section>
            Nós nos esforçamos para fazer nosso aplicativo funcionar bem. Mas
            não podemos garantir que o aplicativo sempre vai funcionar
            perfeitamente. E não somos responsáveis se algo der errado enquanto
            você está usando o aplicativo.
          </section>
          <h2>
            <b>5. Mudanças nos Termos de Uso</b>
          </h2>
          <section>
            De vez em quando, podemos mudar estes Termos de Uso. Se fizermos uma
            grande mudança, vamos te avisar por e-mail ou no nosso aplicativo.
            Se você continuar usando o aplicativo depois de uma mudança, isso
            significa que você concorda com a mudança.
          </section>
          <section>
            Lembre-se: ao usar nosso aplicativo, você está concordando com estes
            Termos de Uso. Então, por favor, leia-os com atenção. E se você
            tiver alguma pergunta, por favor, nos mande uma mensagem. Estamos
            aqui para ajudar!
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TermsPrivacyUseModal;
