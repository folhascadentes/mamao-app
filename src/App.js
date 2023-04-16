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
          "http://localhost:3000/model/model.json"
        );
        setModel(model);
      }
    })();
  }, []);

  function startRecording() {
    const constraints = { audio: false, video: true };

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
    </div>
  );
}
