import React, { useState, useEffect } from "react";

const ProgressBar = ({ url, progress, contentLength, elapsedTime }) => {
  const remainingTime = (elapsedTime / progress) * (100 - progress);
  const estimatedTime = remainingTime;

  return (
    <div className="flex flex-col space-y-2">
      <div
        style={{
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "0.25rem",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "#5EA8FD",
            height: "16px",
            transition: "width 0.5s",
            borderRadius: "0.25rem",
          }}
        ></div>
      </div>
      <div className="flex">
        <div>{progress.toFixed(2)}%</div>
        <div className="flex-grow"></div>
        <div>{estimatedTime.toFixed(2)} segundos</div>
      </div>
      <div className="flex flex-col space-y-2 text-sm">
        <div>Dependencia: {url}</div>
        <div>Tamanho do Conteúdo: {contentLength} bytes</div>
      </div>
    </div>
  );
};
function LoadingScreen() {
  const [progressData, setProgressData] = useState({});
  const [counter, setCounter] = useState(0);
  let patchApplied = false;

  const patchXMLHttpRequest = () => {
    if (patchApplied) {
      return;
    }

    patchApplied = true;

    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (...args) {
      const url = args[1];
      const startTime = new Date();

      setCounter((counter) => counter + 1);

      this.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          const elapsedTime = (new Date() - startTime) / 1000;
          setProgressData({
            url,
            progress: percentComplete,
            contentLength: event.total,
            elapsedTime,
          });
        } else {
          setProgressData({ url, progress: 0 });
        }
      });

      originalOpen.apply(this, args);
    };
  };

  useEffect(() => {
    patchXMLHttpRequest();
  // eslint-disable-next-line
  }, []);

  return (
    <div id="loading-screen" className="text-white px-4">
      <div className="flex flex-col space-y-10 items-center justify-center">
        <div className="text-4xl">
          Configurando sistema de captura
        </div>
        {!progressData.url && <div className="spinner"></div>}
        {progressData.url && (
          <div className="flex-col space-y-8">
            <div className="text-lg">
              Estamos carregando o sistema de inteligência artificial para
              reconhecer seus movimentos ({counter} de 2)
            </div>
            <div className="w-100">
              <ProgressBar
                url={progressData.url}
                progress={progressData.progress}
                contentLength={progressData.contentLength}
                elapsedTime={progressData.elapsedTime}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
