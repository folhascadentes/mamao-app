# Mamão

Welcome to Mamão, an innovative open-source platform designed to crowdsource the collection of sign language data. Our goal is to create a comprehensive, diverse, and high-quality dataset for training Artificial Intelligence (AI) methods. This dataset will be used to build robust sign language recognizers and, consequently, effective sign language translators.

Mamão is a community-driven project. We believe in the power of open data and open source to drive innovation and inclusivity. The data collected through Mamão is openly available to researchers, developers, and anyone interested in advancing sign language recognition and translation technology.

In addition to data collection, Mamão also enables open-source AI development. Users can contribute to the development of AI models directly through our platform. By fostering a collaborative environment, we aim to accelerate progress in sign language translation and make communication more accessible for everyone.

Join us in our mission to bridge the gap between sign language and spoken languages, and help us create a world where everyone can communicate freely and easily, regardless of their hearing ability. Together, we can make a difference. Welcome to Mamão!

You may be wondering about our name, Mamão. In Portuguese, "mamão" is the word for papaya, a tropical fruit. However, the name choice goes beyond that. It's a playful pun on the phrase "uma mão" which means "a hand" in Portuguese, and is similar to the English phrase "give a hand". This resonates with the core purpose of our platform: facilitating sign language learning and practice, which is primarily done using hands. Through Mamão, we aim to 'give a hand' to those seeking to communicate using sign languages, and to those striving to develop new technologies to bridge the communication gap for the deaf and hard of hearing community.

## High-Level Architecture Overview

Our platform is composed of three main components working together to facilitate sign language crowdsourcing. These components are the Subject, Detector, and Instructor.

### Subject

The Subject component is responsible for collecting data about the user's sign language performance. This includes tracking and recording various characteristics such as hand position, hand shape, movement patterns, body angle, and more. By capturing these details, the Subject component provides a comprehensive set of data that can be used to analyze the user's sign language execution.

### Detector

The Detector component plays a critical role in assessing the user's sign language performance. Given the characteristics collected by the Subject and the specification of the sign, the Detector determines whether the sign was performed correctly. It compares the user's execution with the expected execution described in the sign's specification and provides feedback on the user's accuracy.

### Instructor

The Instructor component is designed to guide and assist users in learning and practicing sign language. Given the sign's specification and the characteristics collected from the user by the Subject, the Instructor provides real-time guidance to help the user improve. This may include instructions on how to adjust hand shape or position, tips for improving movement patterns, and more.

By combining these three components, our platform offers a comprehensive solution for sign language practice and learning. The Subject, Detector, and Instructor work together to provide a supportive, informative, and interactive experience for users.

## What is a Sign?

In this section, we outline the key characteristics of a sign. For those who may not be familiar, a sign in sign language is a visual-gestural unit of meaning. Just as spoken languages use sounds combined in different ways to form words, sign languages use gestures (signs), made primarily with the hands, but also involving facial expressions and body movements. Each sign is made up of a number of components that define its meaning and usage.

A sign in sign language is similar to a word in spoken language, it is a way to convey meaning without the use of sound. Instead, it uses visual gestures and movements. Here we provide a specification for the key components that make up a sign in sign language:

### Handshape

Handshape describes the shape the hand takes when forming the sign. Different signs require different handshapes, and the correct handshape is essential in conveying the intended meaning.

### Location

The location refers to where the sign is made. This can be in different parts of the body, or in the space in front of the body.

### Movement

Movement describes any movement of the hands, arms, or body that is part of the sign. Some signs require movement, while others do not.

### Palm Orientation

Palm orientation is the direction the palm is facing during the sign. Correct palm orientation is often crucial to forming the sign correctly.

### Non-Manual Markers

Non-manual markers include facial expressions and body movements that accompany the sign. These can provide additional information that modifies or complements the meaning of the sign.

### Rhythm

Rhythm describes the speed and flow of the sign. Much like spoken language, rhythm can influence meaning and interpretation of the sign.

This specification provides an overview of the characteristics of a sign. For each sign in this open source database, we provide a detailed description that includes these elements. This crowdsourced effort aims to build a comprehensive database of signs to aid in the development of translation and recognition systems. Contributions from everyone, regardless of sign language proficiency, are welcome and appreciated.

## Scope and Variation in Sign Languages

It's important to note that in the initial phase of this project, we are focusing primarily on the manual features of signs - that is, the elements that involve handshapes, locations, movements, and palm orientations. Non-manual markers, such as facial expressions and body movements, while incredibly important in sign language communication, are not being considered at this point in time. We acknowledge the significant role these non-manual markers play in sign languages and plan to incorporate them in future iterations of this project.

Furthermore, sign languages are not universal. Just like spoken languages, sign languages vary greatly around the world. Each sign language has its own vocabulary, grammar, and syntax. Even the same sign can mean different things in different sign languages. For example, the sign for "house" in American Sign Language might be different from that in British Sign Language or Brazilian Sign Language (Libras).

Similarly, each sign language may have unique handshapes and other characteristics that are not found in other sign languages. It's also common for regional variations, known as dialects, to exist within a single sign language.

This project aims to embrace this diversity and provide a platform where signs from different languages can be shared and learned.

## How specifying a Sign

In order to enable uniform representation and easy processing of signs by the system, we're using a standard JSON format to specify the characteristics of a sign. A sign can be represented as a JSON object with the following fields:

```json
{
  "language": "Language of the sign",
  "token": "Identifier of the sign",
  "steps": {
    "start": "Details to be further specified",
    "movement": "Details to be further specified",
    "end": "Details to be further specified"
  }
}
```

Here's a brief explanation of each field:

- language: The name of the sign language in which the sign is used.
- token: A unique identifier for the sign.
- steps: This field represents the sequence of actions that compose the sign. It includes the following subfields:
  - start: Details about the initial handshape, location and/or orientation for the sign.
  - movement: Details about any movements that are part of the sign.
  - end: Details about the final handshape, location and/or orientation for the sign.

### `start` & `end`

The start and end subfields within the steps field contain detailed information about the initial and final states of the sign respectively. Each of these subfields includes two further subfields, dominant and nonDominant, representing the dominant and non-dominant hands.

Both dominant and nonDominant have the same structure and parameters:

```json
{
  "dominant": {
    "location": ["Location.SHOULDER_LEFT", "Location.ELBOW_LEFT"],
    "handShape": "HandShape.libras.L",
    "palmOrientation": "PalmOrientation.DOWN",
    "handOrieation": "HandOrientation.LEFT",
    "options": {
      "location": {
        "track": true
      }
    }
  },
  "nonDominant": {
    "location": "Location.TORAX_LOWER_RIGHT",
    "handShape": "HandShape.libras.A",
    "palmOrientation": "PalmOrientation.DOWN"
  }
}
```

Here's a brief explanation of each field:

- location: This field specifies where the sign starts or ends. It can be a single location or an array of locations if the hand moves between multiple locations.
- handShape: This field represents the shape the hand makes at the start or end of the sign.
- palmOrientation: This field indicates the direction the palm is facing at the start or end of the sign.
- handOrieation: The handOrientation field describes the direction of the vector formed by the wrist to the base of the middle finger. This helps to capture more complex hand orientations that can't be fully described by palm orientation alone. For example, when the hand is rotated or tilted.
- options: This field contains additional optional parameters that can be used to provide more specific details about the sign and more compelx parameters for the detection algorithm.

Each of these fields within the dominant and nonDominant subfields can take either a single value or an array of values.

- When a single value is provided, it specifies the exact characteristic of the sign at the start or end position.
- When an array of values is provided, it indicates that any of the listed characteristics are valid for the sign at the start or end position. This flexibility can be useful for signs where multiple variations exist that are all considered correct.

The options field provides additional settings for more specific or complex signs

- options.location.track (boolean): When set to true, the body's position remains relative even if the person moves. This allows for signs to be performed in motion.
- options.location.radiusOffset (number): Adds randomness to the sign's location within a circular region with radius X. This is used to bring greater diversity to the sign's execution by not strictly confining it to a single exact location.
- options.location.verticalOffset (number): Adds randomness to the sign's location along the y-axis. This can introduce variation in the vertical position of the sign.
- options.location.horizontalOffset (number): Adds randomness to the sign's location along the x-axis. This can introduce variation in the horizontal position of the sign.
- options.location.same (boolean): This is valid only for the end configuration of the sign. When set to true, it indicates that the hand's position at the end of the sign is the same as at the start.
- options.location.side (boolean): This is valid only for the non-dominant hand. When set to true, it indicates that the y-axis of the non-dominant hand will be the same as the y-axis of the dominant hand.

### Constants for Sign Specification

When creating a sign specification, the following constants are used to indicate hand shapes, locations, and orientations.

```javascript
const HandShape = {
  libras: {
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    E: "e",
    F: "f",
    G: "g",
    H: "h",
    I: "i",
    J: "j",
    K: "k",
    L: "l",
    M: "m",
    N: "n",
    O: "o",
    P: "p",
    Q: "q",
    R: "r",
    S: "s",
    T: "t",
    U: "u",
    V: "v",
    W: "w",
    X: "x",
    Y: "y",
  },
};

const Location = {
  FOREHEAD: "forehead",
  FOREHEAD_LEFT: "forehead_left",
  FOREHEAD_RIGHT: "forehead_right",
  NOSE: "nose",
  EYE_LEFT: "eye_left",
  EYE_LEFT_INNER: "eye_left_inner",
  EYE_LEFT_OUTER: "eye_left_outer",
  EYE_RIGHT: "eye_right",
  EYE_RIGHT_INNER: "eye_right_inner",
  EYE_RIGHT_OUTER: "eye_right_outer",
  EAR_LEFT: "ear_left",
  EAR_RIGHT: "ear_right",
  CHEEK_LEFT: "cheek_left",
  CHEEK_RIGHT: "cheek_right",
  MOUTH: "mouth",
  MOUTH_LEFT: "mouth_left",
  MOUTH_RIGHT: "mouth_right",
  CHIN: "chin",
  SHOULDER_LEFT: "shoulder_left",
  SHOULDER_RIGHT: "shoulder_right",
  ELBOW_LEFT: "elbow_left",
  ELBOW_RIGHT: "elbow_right",
  WRIST_LEFT: "wrist_left",
  WRIST_RIGHT: "wrist_right",
  PALM_LEFT: "palm_left",
  PALM_RIGHT: "palm_right",
  THUMB_LEFT: "thumb_cmc_left",
  THUMB_RIGHT: "thumb_cmc_right",
  INDEX_LEFT: "index_mcp_left",
  INDEX_RIGHT: "index_mcp_right",
  MIDDLE_LEFT: "middle_mcp_left",
  MIDDLE_RIGHT: "middle_mcp_right",
  RING_LEFT: "ring_mcp_left",
  RING_RIGHT: "ring_mcp_right",
  PINKY_LEFT: "pinky_mcp_left",
  PINKY_RIGHT: "pinky_mcp_right",
  TORAX: "torax",
  TORAX_LEFT: "torax_left",
  TORAX_RIGHT: "torax_right",
  TORAX_UPPER: "torax_upper",
  TORAX_UPPER_LEFT: "torax_upper_left",
  TORAX_UPPER_RIGHT: "torax_upper_right",
  TORAX_LOWER: "torax_lower",
  TORAX_LOWER_LEFT: "torax_lower_left",
  TORAX_LOWER_RIGHT: "torax_lower_right",
  BELLY: "belly",
  HIP_LEFT: "hip_left",
  HIP_RIGHT: "hip_right",
};

const PalmOrientation = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  FRONT: "front",
  BACK: "back",
};

const HandOrientation = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  FRONT: "front",
  BACK: "back",
};
```

### `movement`

