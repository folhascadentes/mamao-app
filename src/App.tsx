import { useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import * as tensorflow from "@tensorflow/tfjs";
import "./App.css";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Recording from "./Recording";
import EnableCameraModal from "./modals/enable-camera.modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { StyleProvider } from "./reducers/style.reducer";
import {
  AuthProvider,
  DefaultRouteContext,
  PrivateWrapper,
} from "./reducers/auth.reducer";
import ConfirmSignUp from "./ConfirmSignUp";
import ForgetPassword from "./ForgetPassword";
import ConfirmForgetPassword from "./ConfirmForgetPassword";
import { HotkeyProvider } from "./reducers/hotkeys.reducer";
import DatabaseDiversityImportance from "./DatabaseDiversityImportance";
import WhoIsAIAC from "./WhoIsAIAC";

export default function App(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <AuthProvider>
      <Router>
        <StyleProvider>
          <HotkeyProvider>
            {loading && <LoadingScreen />}
            <div id="application">
              <Header />
              <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route
                  path="/confirm-forget-password"
                  element={<ConfirmForgetPassword />}
                />
                <Route
                  path="/database-diversity-importance"
                  element={<DatabaseDiversityImportance />}
                ></Route>
                <Route
                  path="/who-is-aiac"
                  element={<WhoIsAIAC />}
                ></Route>
                <Route
                  path="/instructions"
                  element={
                    <PrivateWrapper>
                      {<Instructions startRecording={startRecording} />}
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
              <Footer />
            </div>
            <EnableCameraModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          </HotkeyProvider>
        </StyleProvider>
      </Router>
    </AuthProvider>
  );
}
