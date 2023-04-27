import React, { useState, useEffect } from "react";
import * as tensorflow from "@tensorflow/tfjs";
import "./App.css";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Instructions from "./Instructions";
import Recording from "./Recording";

export default function App() {
  const [screen, setScreen] = useState("instructions");
  const [loading, setLoading] = useState(false);
  const [cameraSettings, setCameraSettings] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    (async function () {
      if (model === null) {
        const model = await tensorflow.loadLayersModel(
          "https://www.mamao.dev.br/model/model.json"
        );
        setModel(model);
      }
    })();
  }, [model]);

  function startRecording() {
    const constraints = {
      audio: false,
      video: {
        width: 720,
        height: 720,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();

        setCameraSettings(settings);
        setScreen("recording");
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }

  return (
    <div className="App">
      {loading && <LoadingScreen />}
      <div id="application">
        <Header />
        {screen === "instructions" && (
          <Instructions startRecording={startRecording} />
        )}
        {screen === "recording" && (
          <Recording
            setLoading={setLoading}
            model={model}
            cameraSettings={cameraSettings}
          />
        )}
      </div>
      <div className="fixed bottom-0 left-0 mx-auto text-gray-800 w-40 text-center py-4">
        Versão alfa-0.0
      </div>
      <div className="fixed bottom-0 right-0 mx-auto text-blue-800 w-96 text-center py-4">
        <div className="flex space-x-4">
          <a href="#">Sobre</a> <span>•</span>
          <a href="#">Ajuda</a> <span>•</span>
          <a href="#">Privacidade</a> <span>•</span>
          <a href="#">Feedback</a>
        </div>
      </div>
    </div>
  );
}
