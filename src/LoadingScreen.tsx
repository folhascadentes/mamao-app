import React, { useState, useEffect } from "react";
import loading from "./assets/loading.png";

interface DownloadProgress {
  contentLength: number;
  elapsedTime: number;
  progress: number;
  url: string;
}

function LoadingScreen(): JSX.Element {
  const TOTAL_FILES_DOWNLOAD: number = 2;
  const [progressData, setProgressData] = useState<DownloadProgress>();
  const [counter, setCounter] = useState<number>(0);
  let patchApplied: boolean = false;

  function patchXMLHttpRequest(): void {
    if (patchApplied) {
      return;
    }

    patchApplied = true;

    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
      async?: boolean,
      username?: string | null,
      password?: string | null
    ) {
      const startTime: number = new Date().getTime();

      setCounter((counter) => counter + 1);

      this.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete: number = (event.loaded / event.total) * 100;
          const elapsedTime: number = (new Date().getTime() - startTime) / 1000;
          setProgressData({
            url: url.toString(),
            progress: percentComplete,
            contentLength: event.total,
            elapsedTime,
          });
        } else {
          setProgressData({
            url: url.toString(),
            progress: 0,
            contentLength: 0,
            elapsedTime: 0,
          });
        }
      });

      originalOpen.apply(this, arguments as any);
    };
  }

  useEffect(() => {
    patchXMLHttpRequest();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="loading-screen" className="px-4">
      <div className="flex flex-col space-y-10 items-center justify-center">
        <div>
          <img src={loading} style={{ height: "250px" }}></img>
        </div>
        <div className="text-4xl font-light">
          Configurando sistema de captura
        </div>
        {!progressData?.url && <div className="spinner"></div>}
        {progressData?.url && (
          <div className="flex-col space-y-8">
            <div className="text-lg">
              Estamos carregando o sistema de inteligência artificial para
              reconhecer seus movimentos ({counter} de {TOTAL_FILES_DOWNLOAD})
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

function ProgressBar({
  url,
  progress,
  contentLength,
  elapsedTime,
}: DownloadProgress): JSX.Element {
  const remainingTime: number = (elapsedTime / progress) * (100 - progress);

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
        <div>{remainingTime.toFixed(2)} segundos</div>
      </div>
      <div className="flex flex-col space-y-2 text-sm">
        <div>Dependencia: {url}</div>
        <div>Tamanho do Conteúdo: {contentLength} bytes</div>
      </div>
    </div>
  );
}
