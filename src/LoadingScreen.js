import React from "react";

function LoadingScreen() {
  return (
    <div id="loading-screen" className="text-white text-2xl">
      <div className="flex flex-col space-y-2 items-center justify-center">
        <div className="spinner"></div>
        <div>Carregando o sistema de captura</div>
        <div>Aguarde uns 10 segundos</div>
      </div>
    </div>
  );
}

export default LoadingScreen;
