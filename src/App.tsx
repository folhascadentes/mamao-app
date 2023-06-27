import { useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import * as tensorflow from "@tensorflow/tfjs";
import "./App.css";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Recording from "./Recording";
import EnableCameraModal from "./modals/enable-camera.modal";
import { StyleProvider } from "./reducers/style.reducer";

enum ScreenState {
  INSTRUCTIONS = "instructions",
  RECORDING = "recording",
}

export default function App(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hotkeyKeyMap, setHotkeyKeyMap] = useState({});
  const [hotkeyHandlers, setHotkeyHandlers] = useState({});

  const [screen, setScreen] = useState<ScreenState>(ScreenState.INSTRUCTIONS);
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraSettings, setCameraSettings] = useState<MediaTrackSettings>();
  const [handShapeModel, setHandShapeModel] =
    useState<tensorflow.LayersModel>();

  useEffect(() => {
    (async function () {
      if (handShapeModel === undefined) {
        const model = await tensorflow.loadLayersModel(
          process.env.REACT_APP_HAND_SHAPE_MODEL_URL as string
        );
        setHandShapeModel(model);
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
      .catch(() => {
        onOpen();
      });
  }

  function setHotKeys(keyMap: any, handlers: any) {
    setHotkeyKeyMap((k) => ({ ...k, ...keyMap }));
    setHotkeyHandlers((h) => ({ ...h, ...handlers }));
  }

  return (
    <>
      <StyleProvider>
        <GlobalHotKeys
          keyMap={hotkeyKeyMap}
          handlers={hotkeyHandlers}
          allowChanges={true}
        />

        {loading && <LoadingScreen />}
        <div id="application">
          <Header setHotKeys={setHotKeys} />
          {screen === ScreenState.INSTRUCTIONS && (
            <Instructions
              startRecording={startRecording}
              setHotKeys={setHotKeys}
            />
          )}
          {screen === ScreenState.RECORDING && (
            <Recording
              setLoading={setLoading}
              handShapeModel={handShapeModel as tensorflow.LayersModel}
              cameraSettings={cameraSettings as MediaTrackSettings}
            />
          )}
          <Footer setHotKeys={setHotKeys} />
        </div>

        <EnableCameraModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </StyleProvider>
    </>
  );
}
