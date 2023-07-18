import React, { useRef, useEffect } from "react";
import * as tensorflow from "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";
import { Camera } from "@mediapipe/camera_utils";
import {
  HandResults,
  initalizeHandsDetector,
  initializePoseDetector,
  PoseResults,
  Results,
} from "./core/mediapipe";
import { Subject } from "./core/subject";

function Transcribe({
  setLoading,
  handShapeModel,
  transcribeModel,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handShapeModel: tensorflow.LayersModel;
  transcribeModel: tensorflow.LayersModel;
}) {
  const navigate = useNavigate();

  const [predictShow, setPredictShow] = React.useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subjectRef = useRef<Subject>();
  // let trainingData: any = [];

  let poseLandmarks: Coordinate[] = [];
  let poseWorldLandmarks: Coordinate[] = [];
  let predictToken = "";
  let predictCounter = 0;

  const onResultPoseCallback = (results: PoseResults) => {
    if (results.poseWorldLandmarks) {
      poseWorldLandmarks = results.poseWorldLandmarks;
    } else {
      poseWorldLandmarks = [];
    }

    if (results.poseLandmarks) {
      const canvas = canvasRef.current as HTMLCanvasElement;

      poseLandmarks = results.poseLandmarks.map((landmark: Coordinate) => {
        return {
          x: landmark.x * canvas.width,
          y: landmark.y * canvas.height,
          z: landmark.z,
        };
      });
    } else {
      poseLandmarks = [];
    }
  };

  const onResultsHandsCallback = (handResults: HandResults) => {
    const subject = subjectRef.current as Subject;

    const results: Results = {
      ...handResults,
      poseLandmarks,
      poseWorldLandmarks,
    };

    subject.parse(results);
    const buffer = subject.getBuffer();

    if (buffer.length === 24) {
      const input = buffer.map((b) => flattenizeLandmarks(b.readings));

      const prediction = transcribeModel.predict(
        tensorflow.tensor3d([input], [1, 24, 129])
      ) as tensorflow.Tensor<tensorflow.Rank>;

      const predictionData = prediction.dataSync();

      const max = Math.max(...predictionData);
      const index = predictionData.indexOf(max);

      const mapper: any = {
        0: "Agosto",
        1: "Aqui",
        2: "Avisar",
        3: "Bom",
        4: "Certeza",
        5: "Dia",
        6: "Entender",
        7: "Futuro",
        8: "Gostar",
        9: "Me-avisar",
        10: "Meu-nome",
        11: "Nome",
        12: "Não",
        13: "Obrigado",
        14: "Oi",
        15: "Pessoa",
        16: "Quente",
        17: "Rapido",
        18: "Saúde",
        19: "Sim",
        20: "Tarde",
        21: "Tchau",
        22: "Telefone",
        23: "OTHERS",
      };

      console.log(mapper[index], index, max, predictToken, predictCounter);
      if (max > 0.65 && index !== 23) {
        if (mapper[index] !== predictToken) {
          predictToken = mapper[index];
          predictCounter = 0;
        } else {
          predictCounter++;
        }

        if (predictCounter >= 3) {
          setPredictShow(predictToken);
        }
      }
    }
  };

  useEffect(() => {
    if (!transcribeModel) {
      navigate("/instructions");
      return;
    }

    const subject = new Subject(
      canvasRef.current as HTMLCanvasElement,
      24,
      handShapeModel
    );
    subjectRef.current = subject;

    const hands = initalizeHandsDetector();
    const pose = initializePoseDetector();

    pose.onResults(onResultPoseCallback);
    hands.onResults(onResultsHandsCallback);

    const camera = new Camera(videoRef.current as HTMLVideoElement, {
      onFrame: async () => {
        const video = videoRef.current as HTMLVideoElement;
        renderCameraImage(video as HTMLVideoElement);
        await hands.send({ image: video });
        await pose.send({ image: video });
        setLoading(false);
      },
      width: 720,
      height: 720,
    });

    camera.start();

    return () => {
      camera.stop();
      hands.close();
      pose.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="recording flex flex-col justify-center">
      <video
        ref={videoRef}
        className="input_video hidden"
        width="720"
        height="720"
      ></video>
      <div className="flex flex-col md:flex-row md:space-x-8 justify-center font-sm mx-6">
        <div className="w-1/2 flex flex-col space-y-4 items-center justify-center text-center ">
          <h1 className="text-4xl">Transcrição</h1>
          <div className="text-9xl text-orange-500 font-black">
            {predictShow}
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex relative">
            <canvas
              ref={canvasRef}
              className={`border-4 border-neutral-200`}
              width="720"
              height="720"
              style={{
                maxHeight: "720px",
                transform: "scaleX(-1)",
                zoom:
                  window.innerWidth <= 500
                    ? "0.50"
                    : window.innerHeight <= 800
                    ? "0.7"
                    : "",
                borderRadius: "1rem",
              }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );

  function flattenizeLandmarks(data: {
    dominantWorldLandmarks: Coordinate[];
    poseWorldLandmarks: Coordinate[];
  }) {
    let dominantWorldLandmarksNormalized = data.dominantWorldLandmarks
      .map((landmark) => [landmark.x, landmark.y, landmark.z])
      .flat();

    if (dominantWorldLandmarksNormalized.length === 0) {
      dominantWorldLandmarksNormalized = Array(63).fill(0);
    }

    let poseWorldLandmarksNormalized = data.poseWorldLandmarks
      .map((landmark) => [landmark.x, landmark.y]) // , landmark.z
      .flat();

    if (poseWorldLandmarksNormalized.length === 0) {
      poseWorldLandmarksNormalized = Array(66).fill(0);
    }

    const response = [
      ...dominantWorldLandmarksNormalized,
      ...poseWorldLandmarksNormalized,
    ];

    return response;
  }

  function renderCameraImage(image: HTMLVideoElement): void {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });

      if (ctx) {
        ctx.save();
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        ctx.restore();
      }
    }
  }
}

export default Transcribe;
