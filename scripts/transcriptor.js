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

function reshapeArray(array, rows, cols) {
  let output = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(array[i * cols + j]);
    }
    output.push(row);
  }
  return output;
}

function loadAndPrepareData(
  dir,
  ratio = 0.8,
  valRatio = 0.15,
  frameLength = 129,
  frameQuantity = 24
) {
  let dataset = [];
  const classes = fs.readdirSync(dir);
  let classIndexMap = {}; // A map to store each class's index based on first appearance
  let currentIndex = 0; // Current index for class

  let othersData = still.map((element) =>
    reshapeArray(element, frameQuantity, frameLength)
  );

  for (const cls of classes) {
    const classDir = path.join(dir, cls);
    const files = fs.readdirSync(classDir);
    for (const file of files) {
      const filePath = path.join(classDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const rawData = JSON.parse(fileContent).slice(0, 24);
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
        data: padWithZeros(data, frameLength, frameQuantity),
      });

      // Adding the first frame of each video to "OTHERS" class
      // if (rawData.length > 0) {
      //   if (Math.random() > 0.5) {
      //     const firstFrameData = normalizeData(rawData[0]);
      //     othersData.push(firstFrameData);
      //   } else {
      //     const lastFrameData = normalizeData(rawData[rawData.length - 1]);
      //     othersData.push(lastFrameData);
      //   }
      // }
    }
  }

  // Process the "OTHERS" data
  for (let data of othersData) {
    const classOneHot = Array(24).fill(0);
    classOneHot[currentIndex] = 1;
    dataset.push({
      class: classOneHot,
      data: padWithSame(data, frameQuantity),
    });
  }

  if (!classIndexMap.hasOwnProperty("OTHERS")) {
    classIndexMap["OTHERS"] = currentIndex;
  }

  dataset = shuffle(dataset);
  const trainSplitIndex = Math.floor(dataset.length * ratio);
  const validationSplitIndex =
    trainSplitIndex + Math.floor(dataset.length * valRatio);
  const trainingSet = dataset.slice(0, trainSplitIndex);
  const validationSet = dataset.slice(trainSplitIndex, validationSplitIndex);
  const testingSet = dataset.slice(validationSplitIndex);

  return [trainingSet, validationSet, testingSet, classIndexMap];
}

function padWithZeros(data, frameLength, frameQuantity) {
  const paddingSize = frameQuantity - data.length;
  const padding = new Array(frameLength).fill(0);

  for (let i = 0; i < paddingSize; i++) {
    data.push(padding);
  }

  return data;
}

function padWithSame(data, frameQuantity) {
  const paddingSize = frameQuantity - data.length;
  const padding = data[0];

  for (let i = 0; i < paddingSize; i++) {
    data.push(padding);
  }

  return data;
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

function createRNNModel(frames, frameLength, numClasses) {
  const model = tf.sequential();

  // Add a LSTM layer
  model.add(
    tf.layers.lstm({
      units: 128,
      returnSequences: true,
      inputShape: [frames, frameLength],
    })
  );
  model.add(tf.layers.dropout({ rate: 0.2 }));

  // Add a second LSTM layer
  model.add(
    tf.layers.lstm({
      units: 64,
      returnSequences: false,
    })
  );
  model.add(tf.layers.dropout({ rate: 0.2 }));

  // Output layer
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  console.log("Params", model.countParams());

  return model;
}

const [trainingSet, validationSet, testingSet, classIndexMap] =
  loadAndPrepareData("./dataset");

const numberOfClasses = trainingSet[0].class.length;

const model = createRNNModel(
  trainingSet[0].data.length,
  trainingSet[0].data[0].length,
  numberOfClasses
);

model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

const inputTrainTensor = tf.tensor3d(
  trainingSet.map((t) => t.data),
  [
    trainingSet.length,
    trainingSet[0].data.length,
    trainingSet[0].data[0].length,
  ]
);

const outputTrainTensor = tf.tensor2d(
  trainingSet.map((t) => t.class),
  [trainingSet.length, trainingSet[0].class.length]
);
const inputValidationTensor = tf.tensor3d(
  validationSet.map((t) => t.data),
  [
    validationSet.length,
    validationSet[0].data.length,
    validationSet[0].data[0].length,
  ]
);
const outputValidationTensor = tf.tensor2d(
  validationSet.map((t) => t.class),
  [validationSet.map((t) => t.data).length, validationSet[0].class.length]
);

const epochs = 75;
const batchSize = 128;

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
})();

console.log(classIndexMap);
