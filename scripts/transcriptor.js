const tf = require("@tensorflow/tfjs-node-gpu");
const fs = require("fs");
const path = require("path");
const still = require("./data/still");


function normalizeData(data) {
  let dominantWorldLandmarksNormalized = data.dominantWorldLandmarks
    .map((landmark) => [landmark.x, landmark.y, landmark.z])
    .flat();

  if (dominantWorldLandmarksNormalized.length === 0) {
    dominantWorldLandmarksNormalized = Array(63).fill(0);
  }

  const poseWorldLandmarksNormalized = data.poseWorldLandmarks
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

function loadAndPrepareData(dir, ratio = 0.8, targetLength = 3225) {
  let dataset = [];
  const classes = fs.readdirSync(dir);
  let classIndexMap = {}; // A map to store each class's index based on first appearance
  let currentIndex = 0; // Current index for class

  let othersData = still;

  for (const cls of classes) {
    const classDir = path.join(dir, cls);
    const files = fs.readdirSync(classDir);
    for (const file of files) {
      const filePath = path.join(classDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(fileContent).map((d) => normalizeData(d));

      if (!classIndexMap.hasOwnProperty(cls)) {
        classIndexMap[cls] = currentIndex;
        currentIndex += 1;
      }
      const classIndex = classIndexMap[cls];

      const classOneHot = Array(24).fill(0);
      classOneHot[classIndex] = 1;

      dataset.push({
        class: classOneHot,
        data: padWithZeros(data, targetLength),
      });
    }
  }

  for (let data of othersData) {
    const othersDataNormalized = padWithZeros(data, targetLength);
    const classOneHot = Array(24).fill(0);
    classOneHot[currentIndex] = 1;
    dataset.push({
      class: classOneHot,
      data: othersDataNormalized,
    });
  }

  if (!classIndexMap.hasOwnProperty("OTHERS")) {
    classIndexMap["OTHERS"] = currentIndex;
  }

  dataset = shuffle(dataset); // Consider shuffling the dataset for better training
  const splitIndex = Math.floor(dataset.length * ratio);
  const trainingSet = dataset.slice(0, splitIndex);
  const validationSet = dataset.slice(splitIndex);
  return [trainingSet, validationSet, classIndexMap];
}

function padWithZeros(data, targetLength) {
  data = data.flat();
  const paddingSize = targetLength - data.length;
  const padding = new Array(paddingSize).fill(0);
  return [...data, ...padding.map((p) => (p === 0 ? Math.random() : p))];
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function createMLPModel(inputSize, numClasses) {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 64, activation: "selu", inputShape: [inputSize] })
  );
  model.add(tf.layers.dense({ units: 128, activation: "selu" }));
  model.add(tf.layers.dense({ units: 256, activation: "selu" }));
  model.add(tf.layers.dense({ units: 128, activation: "selu" }));
  model.add(tf.layers.dense({ units: 65, activation: "selu" }));
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  console.log("Params", model.countParams());

  return model;
}

const [trainingSet, validationSet, classIndexMap] = loadAndPrepareData(
  "./dataset",
  0.8
);

const numberOfClasses = trainingSet[0].class.length;

const model = createMLPModel(trainingSet[0].data.length, numberOfClasses);

model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

const inputTrainTensor = tf.tensor2d(
  trainingSet.map((t) => t.data),
  [trainingSet.length, trainingSet[0].data.length]
);
const outputTrainTensor = tf.tensor2d(
  trainingSet.map((t) => t.class),
  [trainingSet.length, trainingSet[0].class.length]
);
const inputValidationTensor = tf.tensor2d(
  validationSet.map((t) => t.data),
  [validationSet.map((t) => t.data).length, validationSet[0].data.length]
);
const outputValidationTensor = tf.tensor2d(
  validationSet.map((t) => t.class),
  [validationSet.map((t) => t.data).length, validationSet[0].class.length]
);

const epochs = 100;
const batchSize = 256;

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

console.log(classIndexMap);

// const source = [];

// const input = padWithZeros(
//   source.map((a) => normalizeData(a)),
//   3225
// );

// (async function () {
//   const model = await tf.loadLayersModel("file://./model/model.json");

//   const inputTensor = tf.tensor2d([input]);
//   const prediction = model.predict(inputTensor);
//   const predictionArray = prediction.arraySync();
//   const maxProbability = Math.max(...predictionArray[0]);
//   const indexOfMaxProbability = predictionArray[0].indexOf(maxProbability);

//   console.log(indexOfMaxProbability, {
//     Agosto: 0,
//     Aqui: 1,
//     Avisar: 2,
//     Bom: 3,
//     Certeza: 4,
//     Dia: 5,
//     Entender: 6,
//     Futuro: 7,
//     Gostar: 8,
//     "Me-avisar": 9,
//     "Meu-nome": 10,
//     Nome: 11,
//     Não: 12,
//     Obrigado: 13,
//     Oi: 14,
//     Pessoa: 15,
//     Quente: 16,
//     Rapido: 17,
//     Saúde: 18,
//     Sim: 19,
//     Tarde: 20,
//     Tchau: 21,
//     Telefone: 22,
//     OTHERS: 23,
//   });
// })();
