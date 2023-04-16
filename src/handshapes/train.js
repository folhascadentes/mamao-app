const tf = require("@tensorflow/tfjs-node-gpu");

// Criar um modelo MLP com 3 camadas
function createMLPModel(inputSize, numClasses) {
  const model = tf.sequential();

  // Adicionar a primeira camada oculta
  model.add(
    tf.layers.dense({ units: 32, activation: "relu", inputShape: [inputSize] })
  );

  // Adicionar a segunda camada oculta
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));

  // Adicionar a camada de saída
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  return model;
}

function trainTestSplit(inputData, outputData, validationRatio) {
  if (inputData.length !== outputData.length) {
    throw new Error("Os vetores de entrada e saída devem ter o mesmo tamanho.");
  }

  // Embaralhar os índices dos dados
  const indices = Array.from({ length: inputData.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Dividir os índices de acordo com a proporção de validação
  const validationSize = Math.floor(inputData.length * validationRatio);
  const trainSize = inputData.length - validationSize;

  const trainIndices = indices.slice(0, trainSize);
  const validationIndices = indices.slice(trainSize);

  // Criar os conjuntos de treinamento e validação usando os índices embaralhados
  const inputTrain = trainIndices.map((index) => inputData[index]);
  const outputTrain = trainIndices.map((index) => outputData[index]);

  const inputValidation = validationIndices.map((index) => inputData[index]);
  const outputValidation = validationIndices.map((index) => outputData[index]);

  return {
    inputTrain,
    outputTrain,
    inputValidation,
    outputValidation,
  };
}

// Definir constantes
const inputSize = 63;
const numClasses = 8;

// Criar o modelo MLP
const model = createMLPModel(inputSize, numClasses);

// Compilar o modelo
model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

console.log("Modelo MLP criado com sucesso");

const indexFingerData = require("./indexFinger.js");
const middleAndIndexFingerData = require("./middleAndIndexFinger.js");
const oiCM = require("./oiCM.js");
const openHand = require("./openHand.js");
const openHandFingersApart = require("./openHandFingersApart.js");
const shapeAFinger = require("./shapeAFinger.js");
const shapeLFinger = require("./shapeLFinger.js");
const shapeSFinger = require("./shapeSFinger.js");

const inputData = [
  ...indexFingerData,
  ...middleAndIndexFingerData,
  ...oiCM,
  ...openHand,
  ...openHandFingersApart,
  ...shapeAFinger,
  ...shapeLFinger,
  ...shapeSFinger,
];

const outputData = [
  ...indexFingerData.map(() => [1, 0, 0, 0, 0, 0, 0, 0]),
  ...middleAndIndexFingerData.map(() => [0, 1, 0, 0, 0, 0, 0, 0]),
  ...oiCM.map(() => [0, 0, 1, 0, 0, 0, 0, 0]),
  ...openHand.map(() => [0, 0, 0, 1, 0, 0, 0, 0]),
  ...openHandFingersApart.map(() => [0, 0, 0, 0, 1, 0, 0, 0]),
  ...shapeAFinger.map(() => [0, 0, 0, 0, 0, 1, 0, 0]),
  ...shapeLFinger.map(() => [0, 0, 0, 0, 0, 0, 1, 0]),
  ...shapeSFinger.map(() => [0, 0, 0, 0, 0, 0, 0, 1]),
];

const { inputTrain, outputTrain, inputValidation, outputValidation } =
  trainTestSplit(inputData, outputData, 0.5);

const inputTrainTensor = tf.tensor2d(inputTrain);
const outputTrainTensor = tf.tensor2d(outputTrain);
const inputValidationTensor = tf.tensor2d(inputValidation);
const outputValidationTensor = tf.tensor2d(outputValidation);

const epochs = 150;
const batchSize = 128;

(async function () {
  await model.fit(inputTrainTensor, outputTrainTensor, {
    epochs,
    batchSize,
    validationData: [inputValidationTensor, outputValidationTensor],
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(
          `Epoch ${epoch + 1}: Acurácia de treinamento ${logs.acc.toFixed(
            4
          )}, Acurácia de validação ${logs.val_acc.toFixed(4)}`
        );
      },
    },
  });

  // Avalie o modelo com os dados de validação
  const evaluation = model.evaluate(
    inputValidationTensor,
    outputValidationTensor
  );
  const validationAccuracy = evaluation[1].dataSync()[0];
  console.log(`Acurácia de validação: ${validationAccuracy.toFixed(4)}`);

  const savePath = "file://./model";
  await model.save(savePath);
})();
