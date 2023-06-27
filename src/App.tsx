import {
  useDisclosure,
} from "@chakra-ui/react";
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

enum ScreenState {
  INSTRUCTIONS = "instructions",
  RECORDING = "recording",
}

export default function App(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [buttonHoverColorWeight, setButtonHoverColorWeight] = useState<
    "200" | "800"
  >(
    localStorage.getItem("buttonHoverColorWeight")
      ? (localStorage.getItem("buttonHoverColorWeight") as any)
      : "200"
  );

  const [textColor, setTextColor] = useState<"#000000" | "#ffffff">(
    localStorage.getItem("textColor")
      ? (localStorage.getItem("textColor") as any)
      : "#fffff"
  );
  const [backgroundColor, setBackgroundColor] = useState<"#f5f5f5" | "#000000">(
    localStorage.getItem("backgroundColor")
      ? (localStorage.getItem("backgroundColor") as any)
      : "#f5f5f5"
  );

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
      <GlobalHotKeys
        keyMap={hotkeyKeyMap}
        handlers={hotkeyHandlers}
        allowChanges={true}
      />
      {loading && <LoadingScreen backgroundColor={backgroundColor} />}
      <div id="application">
        <Header
          textColor={textColor}
          backgroundColor={backgroundColor}
          buttonHoverColorWeight={buttonHoverColorWeight}
          setTextColor={setTextColor}
          setBackgroundColor={setBackgroundColor}
          setButtonHoverColorWeight={setButtonHoverColorWeight}
          setHotKeys={setHotKeys}
        />
        {screen === ScreenState.INSTRUCTIONS && (
          <Instructions
            startRecording={startRecording}
            buttonHoverColorWeight={buttonHoverColorWeight}
            setHotKeys={setHotKeys}
          />
        )}
        {screen === ScreenState.RECORDING && (
          <Recording
            setLoading={setLoading}
            handShapeModel={handShapeModel as tensorflow.LayersModel}
            cameraSettings={cameraSettings as MediaTrackSettings}
            backgroundColor={backgroundColor}
          />
        )}
        <Footer backgroundColor={backgroundColor} setHotKeys={setHotKeys} />
      </div>

      <EnableCameraModal
        backgroundColor={backgroundColor}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
