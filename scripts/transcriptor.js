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
      const rawData = JSON.parse(fileContent);
      const data = rawData.map((d) => normalizeData(d));

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

      // Adding the first frame of each video to "OTHERS" class
      if (rawData.length > 0) {
        if (Math.random() > 0.5) {
          const firstFrameData = normalizeData(rawData[0]);
          othersData.push(firstFrameData);
        } else {
          const lastFrameData = normalizeData(rawData[rawData.length - 1]);
          othersData.push(lastFrameData);
        }
      }
    }
  }

  // Process the "OTHERS" data
  for (let data of othersData) {
    const othersDataNormalized = padWithSame(data, targetLength);
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

function padWithSame(data, targetLength) {
  data = data.flat();

  while (data.length < targetLength) {
    data = [...data, ...data];
  }

  return data.slice(0, targetLength);
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
  model.add(tf.layers.dense({ units: 64, activation: "selu" }));
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  console.log("Params", model.countParams());

  return model;
}

const [trainingSet, validationSet, classIndexMap] = loadAndPrepareData(
  "./dataset",
  0.66
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
const batchSize = 512;

const bestModelSavePath = "file://./best_model";
let bestValidationAcc = 0;

async function onEpochEnd(epoch, logs) {
  console.log(
    `Epoch ${epoch + 1}: Training accuracy ${logs.acc.toFixed(
      4
    )}, Validation accuracy ${logs.val_acc.toFixed(4)}`
  );

  // Save the model if the current epoch's validation accuracy is better than previous best
  if (logs.val_acc > bestValidationAcc) {
    bestValidationAcc = logs.val_acc;
    await model.save(bestModelSavePath);
    console.log(
      `New best model saved at epoch ${epoch + 1} to ${bestModelSavePath}`
    );
  }
}

(async function () {
  await model.fit(inputTrainTensor, outputTrainTensor, {
    epochs,
    batchSize,
    validationData: [inputValidationTensor, outputValidationTensor],
    callbacks: {
      onEpochEnd,
    },
  });

  // Avalie o modelo com os dados de validação
  const evaluation = model.evaluate(
    inputValidationTensor,
    outputValidationTensor
  );
  const validationAccuracy = evaluation[1].dataSync()[0];
  console.log(`Validation accuracy: ${validationAccuracy.toFixed(4)}`);
})();

console.log(classIndexMap);
