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
  PublicWrapper,
} from "./reducers/auth.reducer";
import ConfirmSignUp from "./ConfirmSignUp";
import ForgetPassword from "./ForgetPassword";
import ConfirmForgetPassword from "./ConfirmForgetPassword";
import { HotkeyProvider } from "./reducers/hotkeys.reducer";
import DatabaseDiversityImportance from "./DatabaseDiversityImportance";
import WhoIsAIAC from "./WhoIsAIAC";
import TermsPrivacyUse from "./TermsPrivacyUse";
import Profile from "./Profile";
import Transcribe from "./Transcribe";

export default function App(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [to, setTo] = useState<string>("/recording");
  const [cameraSettings, setCameraSettings] = useState<MediaTrackSettings>();
  const [handShapeModel, setHandShapeModel] =
    useState<tensorflow.LayersModel>();
  const [transcribeModel, setTranscribeModel] =
    useState<tensorflow.LayersModel>();

  const fetchSession = async () => {
    const session = JSON.parse(localStorage.getItem("session") ?? "[]");

    if (!session.length) {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_API}/session`,
        {
          headers: {
            Authorization: localStorage.getItem("token") ?? "",
          },
        }
      );
      const data = await response.json();

      data.reverse();

      localStorage.setItem("session", JSON.stringify(data));
    }
  };

  useEffect(() => {
    (async function () {
      if (handShapeModel === undefined) {
        const model = await tensorflow.loadLayersModel(
          process.env.REACT_APP_HAND_SHAPE_MODEL_URL as string
        );
        setHandShapeModel(model);
      }

      if (transcribeModel === undefined) {
        const model = await tensorflow.loadLayersModel(
          process.env.REACT_APP_TRANSCRIBE_MODEL_URL as string
        );
        setTranscribeModel(model);
      }

      fetchSession();
    })();
    // eslint-disable-next-line
  }, []);

  function start(to?: string): void {
    const session = localStorage.getItem("session");
    if (session && session?.length <= 2) {
      fetchSession();
      return;
    }

    setTo(to ?? "/recording");

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
            {loading && <LoadingScreen to={to} />}
            <div id="application">
              <Header />
              <Routes>
                <Route
                  path="/login"
                  element={<PublicWrapper>{<SignIn />}</PublicWrapper>}
                />
                <Route
                  path="/login"
                  element={
                    <PublicWrapper>
                      <SignIn />
                    </PublicWrapper>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <PublicWrapper>
                      <SignUp />
                    </PublicWrapper>
                  }
                />
                <Route
                  path="/confirm-sign-up"
                  element={
                    <PublicWrapper>
                      <ConfirmSignUp />
                    </PublicWrapper>
                  }
                />
                <Route
                  path="/forget-password"
                  element={
                    <PublicWrapper>
                      <ForgetPassword />
                    </PublicWrapper>
                  }
                />
                <Route
                  path="/confirm-forget-password"
                  element={
                    <PublicWrapper>
                      <ConfirmForgetPassword />
                    </PublicWrapper>
                  }
                />
                <Route
                  path="/database-diversity-importance"
                  element={<DatabaseDiversityImportance />}
                ></Route>
                <Route
                  path="/terms-privacy-and-use"
                  element={<TermsPrivacyUse />}
                ></Route>
                <Route path="/who-is-aiac" element={<WhoIsAIAC />}></Route>
                <Route
                  path="/profile"
                  element={<PrivateWrapper>{<Profile />}</PrivateWrapper>}
                />
                <Route
                  path="/instructions"
                  element={
                    <PrivateWrapper>
                      {<Instructions startRecording={start} />}
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
                  path="/transcribe"
                  element={
                    <Transcribe
                      setLoading={setLoading}
                      handShapeModel={handShapeModel as tensorflow.LayersModel}
                      transcribeModel={
                        transcribeModel as tensorflow.LayersModel
                      }
                    />
                  }
                />
                <Route path="*" element={<DefaultRoute />} />
              </Routes>
              <Footer startTranscribe={() => start("/transcribe")} />
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

const DefaultRoute = () => {
  const defaultRoute = useContext(DefaultRouteContext);

  return <Navigate to={defaultRoute} />;
};
