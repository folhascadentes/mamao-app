import React from "react";

function Instructions({ startRecording }) {
  return (
    <div className="p-8 flex justify-center text-xl md:text-2xl font-normal">
      <div style={{ width: "720px" }}>
        <h1 className="text-4xl text-center font-bold mb-10">Olá, Voluntário!</h1>
        <p className="text-left mb-2">
          Agradecemos por se tornar um voluntário e nos dar <b>uma mão</b>.
          Antes de começar, leia e siga as instruções abaixo:
        </p>
        <ol className="list-decimal text-left ml-4 mt-4 mb-10">
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
          <li className="mb-2">
            Siga as instruções exibidas na tela para concluir os passos com
            sucesso.
          </li>
        </ol>
        <div className="text-center">
          <button
            type="button"
            onClick={startRecording}
            className="bg-blue-600 text-white font-bold py-4 px-6 text-2xl rounded-xl mb-10"
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
