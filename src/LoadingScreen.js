import React from "react";

function LoadingScreen() {
  return (
    <div id="loading-screen" className="text-white px-4">
      <div className="flex flex-col space-y-4 items-center justify-center">
        <div className="spinner mb-8"></div>
        <div className="text-2xl">
          Configurando sistema de captura
          <br />
          Aguarde cerca de 10 segundos
        </div>
        <div>
          Estamos carregando o sistema de inteligência artificial para
          reconhecer seus movimentos
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
