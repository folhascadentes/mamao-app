import React from "react";
import letterA from "./assets/letterA.svg";
import letterC from "./assets/letterC.svg";
import letterE from "./assets/letterE.svg";
import letterM from "./assets/letterM.svg";
import letterO from "./assets/letterO.svg";
import letterR from "./assets/letterR.svg";

function Instructions({ startRecording }) {
  return (
    <div className="p-6 flex justify-center text-lg md:text-xl font-normal">
      <div style={{ width: "720px" }}>
        <h1 className="text-3xl md:text-4xl text-center font-bold mb-6 md:mb-10">
          Olá, <span className="text-orange-600">Voluntário</span>!
        </h1>
        <p className="text-left mb-2">
          Agradecemos por se tornar um voluntário e nos dar{" "}
          <span className="text-orange-600 font-bold">uma mão</span>. Antes de
          começar, leia e siga as instruções abaixo:
        </p>
        <ol className="list-decimal text-left ml-4 mt-4 mb-6">
          <li className="mb-2">
            Encerre programas pesados no seu computador para melhorar o
            desempenho da plataforma. Ela utiliza inteligência artificial para
            analisar e auxiliar na sinalização de Libras, além de capturar
            vídeos automaticamente.
          </li>
          <li className="mb-2">
            Certifique-se de que apenas você apareça como protagonista no vídeo.
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
          <div className="flex flex-wrap items-center justify-center space-x-3 mb-6">
            <img src={letterC} title="C" alt="letra C" className="h-20" />
            <img src={letterO} title="O" alt="letra O" className="h-16" />
            <img src={letterM} title="M" alt="letra M" className="h-16" />
            <img src={letterE} title="E" alt="letra E" className="h-20" />
            <img src={letterC} title="C" alt="letra C" className="h-20" />
            <img src={letterA} title="A" alt="letra A" className="h-20" />
            <img src={letterR} title="R" alt="letra R" className="h-20" />
          </div>
          <button
            type="button"
            onClick={startRecording}
            className="bg-blue-600 text-white font-bold py-4 px-8 text-2xl rounded-xl mb-10"
          >
            Começar <span className="text-base">[C]</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
