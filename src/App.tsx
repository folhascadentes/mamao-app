import React, { useState, useEffect } from "react";
import * as tensorflow from "@tensorflow/tfjs";
import "./App.css";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Recording from "./Recording";

enum ScreenState {
  INSTRUCTIONS = "instructions",
  RECORDING = "recording",
}

export default function App(): JSX.Element {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.INSTRUCTIONS);
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraSettings, setCameraSettings] = useState<MediaTrackSettings>();
  const [model, setModel] = useState<tensorflow.LayersModel>();

  useEffect(() => {
    (async function () {
      if (model === undefined) {
        const model = await tensorflow.loadLayersModel(
          process.env.REACT_APP_HAND_SHAPE_MODEL_URL as string
        );
        setModel(model);
      }
    })();
  // eslint-disable-next-line
  }, []);

  function startRecording(): void {
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
        setScreen(ScreenState.RECORDING);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }

  return (
    <div>
      {loading && <LoadingScreen />}
      <div id="application" className="mb-10">
        <Header />
        {screen === ScreenState.INSTRUCTIONS && (
          <Instructions startRecording={startRecording} />
        )}
        {screen === ScreenState.RECORDING && (
          <Recording
            setLoading={setLoading}
            model={model}
            cameraSettings={cameraSettings}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
