import { useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { GlobalHotKeys } from "react-hotkeys";
import * as tensorflow from "@tensorflow/tfjs";
import "./App.css";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Recording from "./Recording";
import EnableCameraModal from "./modals/enable-camera.modal";
import Login from "./Login";
import SignUp from "./SignUp";
import { StyleProvider } from "./reducers/style.reducer";
import {
  AuthProvider,
  DefaultRouteContext,
  PrivateWrapper,
} from "./reducers/auth.reducer";
import ConfirmSignUp from "./ConfirmSignUp";

export default function App(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hotkeyKeyMap, setHotkeyKeyMap] = useState({});
  const [hotkeyHandlers, setHotkeyHandlers] = useState({});

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
    <AuthProvider>
      <Router>
        <StyleProvider>
          <GlobalHotKeys
            keyMap={hotkeyKeyMap}
            handlers={hotkeyHandlers}
            allowChanges={true}
          />
          {loading && <LoadingScreen />}
          <div id="application">
            <Header setHotKeys={setHotKeys} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
              <Route
                path="/instructions"
                element={
                  <PrivateWrapper>
                    {
                      <Instructions
                        startRecording={startRecording}
                        setHotKeys={setHotKeys}
                      />
                    }
                  </PrivateWrapper>
                }
              />
              <Route
                path="/recording"
                element={
                  <PrivateWrapper>
                    {
                      <Recording
                        setLoading={setLoading}
                        handShapeModel={
                          handShapeModel as tensorflow.LayersModel
                        }
                        cameraSettings={cameraSettings as MediaTrackSettings}
                      />
                    }
                  </PrivateWrapper>
                }
              />
              <Route
                path="*"
                element={<Navigate to={useContext(DefaultRouteContext)} />}
              />
            </Routes>
            <Footer setHotKeys={setHotKeys} />
          </div>
          <EnableCameraModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        </StyleProvider>
      </Router>
    </AuthProvider>
  );
}
