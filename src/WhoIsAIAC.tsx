import React from "react";
import handsOne from "./assets/handsOne.webp";
import handsTwo from "./assets/handsTwo.webp";
import handsThree from "./assets/handsThree.webp";
import handsFour from "./assets/handsFour.webp";

function WhoIsAIAC(): JSX.Element {
  return (
    <>
      <div className="flex flex-wrap justify-center space-x-8 mt-8 xl:mt-16">
        <div
          className="flex flex-col mx-6 md:mx-0 space-y-4"
          style={{ width: window.innerWidth <= 500 ? "auto" : "600px" }}
        >
          <h1 className="text-6xl md:text-8xl font-black text-lime-500">
            Folhas Cadentes
          </h1>
          <h2 className="text-3xl md:text-4xl font-black text-orange-500 mb-2">
            Quem somos nós?
          </h2>
          <p>
            “A vida é naturalmente injusta, mas somos capazes de torná-la
            artificialmente justa” - Anônimo
          </p>
          <p>
            Nós somos a <span className="font-bold">Folhas Cadentes</span>,
            formalmente AIAC (Associação de Inovação em Acessibilidade
            Computacional), um grupo de pessoas que quer tornar a internet mais
            fácil para todos. Queremos que todo mundo possa usar e aproveitar a
            internet, não importa quem seja ou de onde venha.
          </p>
          <p>
            Nosso nome, "Folhas Cadentes", é como uma estrela cadente feita de
            folhas. As folhas representam crescimento e mudança, e a estrela
            cadente é um símbolo de esperança e desejos que se tornam realidade.
            Juntos, estamos trabalhando para tornar o desejo de uma internet
            mais acessível uma realidade.
          </p>
          <p>
            Nós estamos aqui para ajudar, mas as verdadeiras estrelas são as
            pessoas que estamos tentando ajudar.
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-orange-500 mb-2">
            O que queremos?
          </h2>
          <p>
            Queremos criar um mundo mais igualitário, onde todos tenham as
            mesmas oportunidades. Acreditamos que todos nós, em algum momento,
            podemos enfrentar dificuldades ou limitações, e é por isso que
            estamos trabalhando para tornar a internet mais acessível.
          </p>
          <p>
            Estamos trabalhando para trazer inovações que tornem a internet mais
            acessível, não apenas para agora, mas também para o futuro.
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-orange-500 mb-2">
            O que estamos fazendo?
          </h2>
          <p>
            Estamos criando um tradutor de língua de sinais que será gratuito
            para todos. Este projeto se chama Mamão e tem como objetivo tornar a
            comunicação mais fácil para todos. Mas o mais importante é que tudo
            que fazemos é gratuito e aberto para todos. Seja você uma pessoa
            individual, uma empresa que quer construir algo em cima do nosso
            trabalho, ou um órgão do setor público, não importa.
          </p>
          <p>
            Estamos aqui para trabalhar com todos e para todos. Nossa missão é
            tornar a internet um lugar mais justo e acessível, e estamos felizes
            em compartilhar nossas soluções com quem quiser usá-las.
          </p>
        </div>
        <div className="hidden md:flex md:flex-col space-y-6">
          <img src={handsTwo} style={{ height: "625px" }} alt="" />
          <img src={handsOne} style={{ height: "625px" }} alt="" />
        </div>
        <div></div>
      </div>
      <div className="flex flex-wrap justify-center space-x-8 xl:space-x-16 mb-24">
        <div className="hidden md:flex md:flex-col space-y-6 pt-12">
          <img src={handsFour} style={{ height: "625px" }} alt="" />
        </div>
        <div className="hidden md:flex md:flex-col space-y-6 pt-12">
          <img src={handsThree} style={{ height: "625px" }} alt="" />
        </div>
      </div>
    </>
  );
}

export default WhoIsAIAC;
