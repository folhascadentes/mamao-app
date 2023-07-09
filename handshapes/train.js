const tf = require("@tensorflow/tfjs-node-gpu");
const fs = require("fs");

// Criar um modelo MLP com 3 camadas
function createMLPModel(inputSize, numClasses) {
  const model = tf.sequential();

  // Adicionar a primeira camada oculta
  model.add(
    tf.layers.dense({ units: 32, activation: "selu", inputShape: [inputSize] })
  );

  // Adicionar a segunda camada oculta
  model.add(tf.layers.dense({ units: 64, activation: "selu" }));

  // Adicionar a terceira camada oculta
  model.add(tf.layers.dense({ units: 128, activation: "selu" }));

  model.add(tf.layers.dense({ units: 64, activation: "selu" }));

  model.add(tf.layers.dense({ units: 32, activation: "selu" }));

  // Adicionar a camada de saída
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  console.log("Params", model.countParams());

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

function loadDataset(dirpath) {
  const files = fs.readdirSync("libras");
  const inputData = [];
  const outputData = [];
  const classes = files.length;

  for (const [fileIndex, file] of files.entries()) {
    const path = `${dirpath}/${file}`;
    const data = require(path);
    inputData.push(data);
    outputData.push(
      data.map(() => {
        return Array.from(new Array(classes)).map((value, index) =>
          index === fileIndex ? 1 : 0
        );
      })
    );
  }

  return [
    inputData.flat(),
    outputData.flat(),
    files.map((file) => file.split(".")[0]),
  ];
}

const [inputData, outputData, classes] = loadDataset(`${__dirname}/libras`);

console.log(classes);

// Definir constantes
const inputSize = inputData[0].length;
const numClasses = outputData[0].length;

// Criar o modelo MLP
const model = createMLPModel(inputSize, numClasses);

// Compilar o modelo
model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

console.log("Modelo MLP criado com sucesso");

const { inputTrain, outputTrain, inputValidation, outputValidation } =
  trainTestSplit(inputData, outputData, 0.01);

const inputTrainTensor = tf.tensor2d(inputTrain);
const outputTrainTensor = tf.tensor2d(outputTrain);
const inputValidationTensor = tf.tensor2d(inputValidation);
const outputValidationTensor = tf.tensor2d(outputValidation);

const epochs = 450;
const batchSize = 64;

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
