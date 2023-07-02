# 🤟 Mamão ![Beta](https://img.shields.io/badge/-Beta-blue)

<p align="center">
  <img src="docs/images/hands.png" alt="Cover Image" width="300"/>
</p>

Welcome to Mamão, an innovative open-source platform designed to crowdsource the collection of sign language data. Our goal is to create a comprehensive, diverse, and high-quality dataset for training Artificial Intelligence (AI) methods. This dataset will be used to build robust sign language recognizers and, consequently, effective sign language translators.

Mamão is a community-driven project. We believe in the power of open data and open source to drive innovation and inclusivity. The data collected through Mamão is openly available to researchers, developers, and anyone interested in advancing sign language recognition and translation technology.

In addition to data collection, Mamão also enables open-source AI development. Users can contribute to the development of AI models directly through our platform. By fostering a collaborative environment, we aim to accelerate progress in sign language translation and make communication more accessible for everyone.

Join us in our mission to bridge the gap between sign language and spoken languages, and help us create a world where everyone can communicate freely and easily, regardless of their hearing ability. Together, we can make a difference. Welcome to Mamão!

You may be wondering about our name, Mamão. In Portuguese, "mamão" is the word for papaya, a tropical fruit. However, the name choice goes beyond that. It's a playful pun on the phrase "uma mão" which means "a hand" in Portuguese, and is similar to the English phrase "give a hand". This resonates with the core purpose of our platform: facilitating sign language learning and practice, which is primarily done using hands. Through Mamão, we aim to 'give a hand' to those seeking to communicate using sign languages, and to those striving to develop new technologies to bridge the communication gap for the deaf and hard of hearing community.

## 📚 Table of Contents

1. [📝 Product Requirements](#📝-product-requirements)
2. [🏗️ High-Level Architecture Overview](#🏗️-high-level-architecture-overview)
3. [✋ What is a Sign?](#✋-what-is-a-sign)
4. [🌍 Scope and Variation in Sign Languages](#🌍-scope-and-variation-in-sign-languages)
5. [🔍 How specifying a Sign](#🔍-how-specifying-a-sign)
6. [🗺️ Project Roadmap](#🗺️-project-roadmap)
7. [🚀 Getting Started](#🚀-getting-started)
8. [📊 Data Collection and Training](#📊-data-collection-and-training)

## 📝 Product Requirements

In developing our open-source crowdsourcing platform for training sign language recognition methods, we've identified several crucial product requirements. These requirements will guide our design and development processes, and are essential in creating a platform that is not only effective and secure, but also accessible and engaging.

### Accessibility

A central tenet of our platform is accessibility. Given that our project's primary mission is to enhance accessibility in technology, particularly for those who communicate via sign language, we're committed to ensuring our platform is fully accessible to all users, including those with physical or cognitive disabilities. Conforming to the highest web accessibility standards, supporting assistive technologies, and designing an easily navigable and understandable user experience are not just goals, but necessities. To ensure continuous improvement in accessibility, we plan to incorporate features such as adjustable text sizes, high-contrast modes, and screen reader compatibility. We welcome contributions that further promote and improve accessibility.

### Volunteer Engagement

Active volunteer participation is a crucial element of our platform. To stimulate engagement, we aim to build an intuitive and rewarding user experience that includes features like a points-based rewards system, gamification elements, and real-time feedback for contributions. Over time, we aim to introduce additional features, such as user badges for specific milestones, community forums for volunteers to interact, and public recognition for top contributors. We're always open to suggestions for new features that could drive engagement.

### Data Quality

Ensuring high-quality, diverse, and representative data is essential for any machine learning project. We will implement mechanisms like peer reviews, automatic data validation, and active moderation to guarantee the quality and diversity of our data. Over time, we will be adding advanced features like AI-assisted validation to improve data quality even further. We value input and assistance in enhancing our data quality assurance processes.

### Scalability and Performance

The platform should be scalable, able to support a growing number of users and contributions without any compromise to performance. A seamless user experience is the goal, regardless of our user base size or the volume of data they contribute. Over time, we will continuously tune performance and explore technologies that help us scale effectively. We encourage contributions that improve our platform's scalability and performance.

### Security and Privacy

Given the nature of our data collection platform, user security and privacy is a top priority. Robust security standards and clear privacy and consent policies will be the bedrock of our platform. Future enhancements may include multi-factor authentication, encryption for data at rest and in transit, and regular third-party security audits. Help in improving our security posture is always welcome.

### Open Source

As an open-source project, we believe in the power of community collaboration. This approach promotes transparency, allows for continuous improvement, and speeds up innovation. As we continue to evolve the platform, we encourage developers to contribute code, offer suggestions, and help us continually enhance our platform.

In conclusion, these requirements represent our dedication to creating an inclusive, engaging, secure, and high-quality platform for advancing sign language recognition technology. We welcome all contributions that align with our mission and help us improve our platform.

## 🏗️ High-Level Architecture Overview

Our platform is composed of three main components working together to facilitate sign language crowdsourcing. These components are the Subject, Detector, and Instructor.

### Subject

The Subject component is responsible for collecting data about the user's sign language performance. This includes tracking and recording various characteristics such as hand position, hand shape, movement patterns, body angle, and more. By capturing these details, the Subject component provides a comprehensive set of data that can be used to analyze the user's sign language execution.

### Detector

The Detector component plays a critical role in assessing the user's sign language performance. Given the characteristics collected by the Subject and the specification of the sign, the Detector determines whether the sign was performed correctly. It compares the user's execution with the expected execution described in the sign's specification and provides feedback on the user's accuracy.

### Instructor

The Instructor component is designed to guide and assist users in learning and practicing sign language. Given the sign's specification and the characteristics collected from the user by the Subject, the Instructor provides real-time guidance to help the user improve. This may include instructions on how to adjust hand shape or position, tips for improving movement patterns, and more.

By combining these three components, our platform offers a comprehensive solution for sign language practice and learning. The Subject, Detector, and Instructor work together to provide a supportive, informative, and interactive experience for users.

## ✋ What is a Sign?

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

## 🌍 Scope and Variation in Sign Languages

It's important to note that in the initial phase of this project, we are focusing primarily on the manual features of signs - that is, the elements that involve handshapes, locations, movements, and palm orientations. Non-manual markers, such as facial expressions and body movements, while incredibly important in sign language communication, are not being considered at this point in time. We acknowledge the significant role these non-manual markers play in sign languages and plan to incorporate them in future iterations of this project.

Furthermore, sign languages are not universal. Just like spoken languages, sign languages vary greatly around the world. Each sign language has its own vocabulary, grammar, and syntax. Even the same sign can mean different things in different sign languages. For example, the sign for "house" in American Sign Language might be different from that in British Sign Language or Brazilian Sign Language (Libras).

Similarly, each sign language may have unique handshapes and other characteristics that are not found in other sign languages. It's also common for regional variations, known as dialects, to exist within a single sign language.

This project aims to embrace this diversity and provide a platform where signs from different languages can be shared and learned.

## 🔍 How specifying a Sign

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

- **language**: The name of the sign language in which the sign is used.
- **token**: A unique identifier for the sign.
- **steps**: This field represents the sequence of actions that compose the sign. It includes the following subfields:
  - **start**: Details about the initial handshape, location and/or orientation for the sign.
  - **movement**: Details about any movements that are part of the sign.
  - **end**: Details about the final handshape, location and/or orientation for the sign.

### `start` & `end`

The start and end subfields within the steps field contain detailed information about the initial and final states of the sign respectively. Each of these subfields includes two further subfields, dominant and nonDominant, representing the dominant and non-dominant hands.

Both dominant and nonDominant have the same structure and parameters:

```json
{
  "dominant": {
    "location": ["Location.SHOULDER_LEFT", "Location.ELBOW_LEFT"],
    "handShape": "HandShape.libras.L",
    "palmOrientation": "PalmOrientation.DOWN",
    "handOrientation": "HandOrientation.LEFT",
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

- **location**: This field specifies where the sign starts or ends. It can be a single location or an array of locations if the hand moves between multiple locations.
- **handShape**: This field represents the shape the hand makes at the start or end of the sign.
- **palmOrientation**: This field indicates the direction the palm is facing at the start or end of the sign.
- **handOrieation**: The handOrientation field describes the direction of the vector formed by the wrist to the base of the middle finger. This helps to capture more complex hand orientations that can't be fully described by palm orientation alone. For example, when the hand is rotated or tilted.
- **options**: This field contains additional optional parameters that can be used to provide more specific details about the sign and more compelx parameters for the detection algorithm.

Each of these fields within the dominant and nonDominant subfields can take either a single value or an array of values.

- When a single value is provided, it specifies the exact characteristic of the sign at the start or end position.
- When an array of values is provided, it indicates that any of the listed characteristics are valid for the sign at the start or end position. This flexibility can be useful for signs where multiple variations exist that are all considered correct.

The options field provides additional settings for more specific or complex signs

- **options.location.handLocation** (HandLocation): This option is used to define the specific hand location required to accurately execute a sign language gesture. By tracking the location of the hand, the system can verify whether a person is correctly positioned to perform the sign. The value of this property should be an instance of the HandLocation type.
- **options.location.detectionRadius** (number): This option define the radius that the handLocation need to be within to be considered valid. This is used to provide some flexibility in the location of the hand. Measurements are in pixels. Default value is 40 pixels.
- **options.location.track** (boolean): When set to true, the body's position remains relative even if the person moves. This allows for signs to be performed in motion.
- **options.location.radiusOffset** (number | { value: number; leftLimitValue?: number; rightLimitValue?: number; upLimitValue?: number; downLimitValue?: number; }): Adds randomness to the sign's location within a circular region with radius X. This is used to bring greater diversity to the sign's execution by not strictly confining it to a single exact location.
- **options.location.verticalOffset** (number): Adds randomness to the sign's location along the y-axis. This can introduce variation in the vertical position of the sign.
- **options.location.horizontalOffset** (number): Adds randomness to the sign's location along the x-axis. This can introduce variation in the horizontal position of the sign.
- **options.location.same** (boolean): This is valid only for the end configuration of the sign. When set to true, it indicates that the hand's position at the end of the sign is the same as at the start.
- **options.location.sameY** (boolean): This is valid only for the end configuration of the sign. When set to true, it indicates that the hand's position Y-axis at the end of the sign is the same as at the start.
- **options.location.sameX** (boolean): This is valid only for the end configuration of the sign. When set to true, it indicates that the hand's position X-axis at the end of the sign is the same as at the start.
- **options.location.side** (boolean): This is valid only for the non-dominant hand. When set to true, it indicates that the y-axis of the non-dominant hand will be the same as the y-axis of the dominant hand.

### Constants for Sign Specification

When creating a sign specification, the following constants are used to indicate hand shapes, locations, and orientations.

```typescript
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
    Z: "z",
    INDEX_FINGER: "indexFinger",
    MIDDLE_AND_INDEX_FINGER: "middleAndIndexFinger",
    OI: "oi",
    OPEN_HAND: "openHand",
    OPEN_HAND_FINGERS_APART: "openHandFingersApart",
    OPEN_HAND_THUMB_APART: "openHandThumbApart",
    THUMB_FINGER: "thumbFinger",
    THUMB_TOUCH_INDEX_FINGERS_CLOSED: "thumbTouchIndexFingersClosed",
  },
};

enum Location {
  FOREHEAD = "FOREHEAD",
  FOREHEAD_LEFT = "FOREHEAD_LEFT",
  FOREHEAD_RIGHT = "FOREHEAD_RIGHT",
  NOSE = "NOSE",
  EYE_LEFT = "EYE_LEFT",
  EYE_LEFT_INNER = "EYE_LEFT_INNER",
  EYE_LEFT_OUTER = "EYE_LEFT_OUTER",
  EYE_RIGHT = "EYE_RIGHT",
  EYE_RIGHT_INNER = "EYE_RIGHT_INNER",
  EYE_RIGHT_OUTER = "EYE_RIGHT_OUTER",
  EAR_LEFT = "EAR_LEFT",
  EAR_RIGHT = "EAR_RIGHT",
  CHEEK_LEFT = "CHEEK_LEFT",
  CHEEK_RIGHT = "CHEEK_RIGHT",
  MOUTH = "MOUTH",
  MOUTH_LEFT = "MOUTH_LEFT",
  MOUTH_RIGHT = "MOUTH_RIGHT",
  CHIN = "CHIN",
  SHOULDER_LEFT = "SHOULDER_LEFT",
  SHOULDER_RIGHT = "SHOULDER_RIGHT",
  ELBOW_LEFT = "ELBOW_LEFT",
  ELBOW_RIGHT = "ELBOW_RIGHT",
  WRIST_LEFT = "WRIST_LEFT",
  WRIST_RIGHT = "WRIST_RIGHT",
  PALM_LEFT = "PALM_LEFT",
  PALM_RIGHT = "PALM_RIGHT",
  THUMB_LEFT = "THUMB_CMC_LEFT",
  THUMB_RIGHT = "THUMB_CMC_RIGHT",
  INDEX_LEFT = "INDEX_MCP_LEFT",
  INDEX_RIGHT = "INDEX_MCP_RIGHT",
  MIDDLE_LEFT = "MIDDLE_MCP_LEFT",
  MIDDLE_RIGHT = "MIDDLE_MCP_RIGHT",
  RING_LEFT = "RING_MCP_LEFT",
  RING_RIGHT = "RING_MCP_RIGHT",
  PINKY_LEFT = "PINKY_MCP_LEFT",
  PINKY_RIGHT = "PINKY_MCP_RIGHT",
  TORAX = "TORAX",
  TORAX_LEFT = "TORAX_LEFT",
  TORAX_RIGHT = "TORAX_RIGHT",
  TORAX_UPPER = "TORAX_UPPER",
  TORAX_UPPER_LEFT = "TORAX_UPPER_LEFT",
  TORAX_UPPER_RIGHT = "TORAX_UPPER_RIGHT",
  TORAX_LOWER = "TORAX_LOWER",
  TORAX_LOWER_LEFT = "TORAX_LOWER_LEFT",
  TORAX_LOWER_RIGHT = "TORAX_LOWER_RIGHT",
  BELLY = "BELLY",
  HIP_LEFT = "HIP_LEFT",
  HIP_RIGHT = "HIP_RIGHT",
}

// See https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md
enum HandLocation {
  WRIST = "WRIST",
  THUMB_CMC = "THUMB_CMC",
  THUMB_MCP = "THUMB_MCP",
  THUMB_IP = "THUMB_IP",
  THUMB_TIP = "THUMB_TIP",
  INDEX_FINGER_MCP = "INDEX_FINGER_MCP",
  INDEX_FINGER_PIP = "INDEX_FINGER_PIP",
  INDEX_FINGER_DIP = "INDEX_FINGER_DIP",
  INDEX_FINGER_TIP = "INDEX_FINGER_TIP",
  MIDDLE_FINGER_MCP = "MIDDLE_FINGER_MCP",
  MIDDLE_FINGER_PIP = "MIDDLE_FINGER_PIP",
  MIDDLE_FINGER_DIP = "MIDDLE_FINGER_DIP",
  MIDDLE_FINGER_TIP = "MIDDLE_FINGER_TIP",
  RING_FINGER_MCP = "RING_FINGER_MCP",
  RING_FINGER_PIP = "RING_FINGER_PIP",
  RING_FINGER_DIP = "RING_FINGER_DIP",
  RING_FINGER_TIP = "RING_FINGER_TIP",
  PINKY_MCP = "PINKY_MCP",
  PINKY_PIP = "PINKY_PIP",
  PINKY_DIP = "PINKY_DIP",
  PINKY_TIP = "PINKY_TIP",
}

enum PalmOrientation {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  FRONT = "FRONT",
  BACK = "BACK",
}

enum HANDORIENTATION {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  FRONT = "FRONT",
  BACK = "BACK",
}
```

### `movement`

The movement field in the sign object is used to describe the specific movements required to perform a sign. This field is divided into two subfields: dominant and nonDominant, representing the movements of the dominant and non-dominant hands respectively.

```json
{
  "dominant": {
    "detect": [
      { "y": 1, "x": 1 },
      { "y": -1, "x": 1 },
      { "y": -1, "x": -1 },
      { "y": 1, "x": -1 }
    ],
    "forbidden": [],
    "options": {
      "detect": {
        "circular": true
      }
    },
    "metadata": {
      "description": "Perform a circular movement",
      "type": "CIRCULAR"
    }
  },
  "nonDominant": {}
}
```

In the dominant and nonDominant subfields, you can specify various properties:

- **detect**: This field holds an array of objects defining the required movements for the sign. Each object should match the structure of the movement object defined below. If this field holds an array of arrays, it indicates that multiple movement patterns can be used to validate the sign.
- **forbidden**: This field contains an array of movements that should not be performed when executing the sign. Each object in the array should match the structure of the movement object.
- **options**: This field can contain additional options for detecting the movement.
- **metadata**: This field contains additional descriptive information about the movement. The description subfield provides a human-readable explanation of the movement, and the type subfield categorizes the movement into one of several predefined types: CIRCULAR, LINEAR, PARABOLICAL, ZIG_ZAG, SHAKE.

The movement object structure is as follows:

```json
{
  "x": "-1|1",
  "y": "-1|1",
  "z": "-1|1",
  "wristRotate": "boolean",
  "wristExtension": "boolean",
  "wristFlexion": "boolean",
  "wristAbduction": "boolean",
  "wristAdduction": "boolean"
}
```

- **x**: This property identifies whether the wrist moves along the X-axis. A value of -1 indicates a leftward movement, while a value of 1 indicates a rightward movement. An undefined value signifies that the wrist is still.
- **y**: This property tracks wrist movement along the Y-axis. A value of -1 corresponds to a downward movement, while a value of 1 corresponds to an upward movement. An undefined value means the wrist is stationary.
- **z**: This property monitors the wrist's movement along the Z-axis. A value of -1 denotes a backward movement, while a value of 1 denotes a forward movement. An undefined value denotes a lack of movement.
- **wristRotate**: This boolean property indicates whether the sign language gesture requires wrist rotation. A value of true means the gesture requires rotation, while false means it does not.
- **wristExtension**: This boolean property indicates whether the gesture requires wrist extension, which involves lifting the back of your hand. true means the gesture requires extension, false means it does not.
- **wristFlexion**: This boolean property indicates whether the gesture requires wrist flexion, or bending your hand downward. true indicates that flexion is required, false means it is not.
  wristAbduction: This boolean property identifies whether the gesture requires wrist abduction, which involves moving your hand towards the thumb side. A true value means abduction is required, false means it is not.
- **wristAdduction**: This boolean property signifies whether the gesture requires wrist adduction, or moving your hand towards the little finger side. A true value indicates adduction is required, false means it is not.

Each field in the movement object describes a specific aspect of the hand movement required for the sign. These fields can be used to define very precise movements, enabling accurate detection and instruction of signs.

The options field provides additional settings for more specific or complex signs

- **options.detect.circular**: This means the movement can start at any position of the array of movement objects.

## 🗺️ Project Roadmap

Our development process is structured in stages to allow for incremental improvements and necessary adjustments based on user feedback. Below is an outline of our project roadmap:

### ~~Alpha Release~~

~~The main objective of the Alpha release is to validate whether users can independently and intuitively signal the signs registered in the system through the platform. We aim to register at least 75 signs at this stage.~~

~~During the Alpha phase, we'll focus on:~~

- ~~User testing to understand if the system is intuitive and straightforward for the users.~~
- ~~Making improvements to decrease the learning curve and increase the number of signals per minute from volunteers.~~
- ~~Actively seeking user feedback and making necessary adjustments to enhance the user experience.~~

### Beta Release

The Beta release will occur after validating that the system is intuitive and capable of identifying various types of signs. At this stage, we aim to register at least 250 signs and launch a mobile version for Android and iOS platforms.

In the Beta phase, our focus will be:

- Making enhancements in alignment with the product requirements.
- Prioritizing improvements in accessibility, a critical criterion before launching the first official version.
- Continuing to gather user feedback to further refine the user experience.

### Version 1.0

Version 1.0 will be launched once we meet the requirements of having 500 signs registered and fully functional applications on both Android and iOS platforms.

In this phase, we will focus on:

- Growing our volunteer base and improving volunteer engagement.
- Analyzing user behavior and feedback to identify areas for improvement and optimization.
- Ensuring the robustness of the platform by handling a larger number of users and data.
- Continuing to refine and enhance our platform based on user feedback and needs.

Please note that this roadmap is a living document and may be subject to changes as the project evolves. Feedback, suggestions, and contributions are always welcome at each stage of the project.

## 🚀 Getting Started

### Running the Application Locally

You can serve the application locally using Node Package Manager (npm). If you have npm installed, you can start the application with the following command:

```bash
npm start
```

This command will start a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Deployment

We currently have a deploy.sh script for deploying the application to an AWS environment. Create a .env file with the following variables

```bash
AWS_REGION=AWS_REGION
S3_BUCKET_NAME=NAME_OF_BUCKET_THAT_WILL_DEPLOY
CLOUDFRONT_DISTRIBUTION_ID=ID_OF_CLOUD_DISTRIBUTION
```

### Environment Variables

Please be aware that some environment variables are currently hardcoded in the code. This is something we recognize as a limitation and we aim to refactor this to use a .env file or a similar mechanism to handle environment-specific variables.

You will need to update the .env.development or .env.production file to include the following variable:

```bash
REACT_APP_BACK_END_API=YOUR_BACKEND_API_URL
```

### Backend

The backend for this application is modeled around AWS services. You can find the backend code at <a href="https://github.com/folhascadentes/mamao-backend" target="_new">this link</a>.

### Development Version

You can access the current development version of the application at app.mamao.dev.br.

Please note that this is a work in progress and we appreciate your understanding as we continue to improve and optimize the application. We welcome any feedback and contributions to help make our application better!

## 📊 Data Collection and Training

The following sections pertain to the techniques and methods used within the platform to collect sign data and train the underlying models. These methods are used for the collection and representation of sign data, contributing to the training and functionality of the platform. They do not directly relate to the final product, which is the database of sign language gestures.

### Handshapes Dataset

Within the root directory of this project, you'll find a folder named handshapes. This folder contains the datasets for handshapes in the libras subfolder. These datasets are used for training a neural network to detect handshapes.

### Neural Network Training

There's also a train.js script within the handshapes directory that is used to train a neural network for handshape detection. This script utilizes the datasets in the handshapes/libras folder.

### Data Logging

Within the src/utils/subject.ts file, you'll find a constant CAPTURE_HAND_DATA. If this is set to true, the application will start logging the MediaPipe landmarks and printing them to the console. This method was used to collect the handshape datasets, by forming the hand in front of the camera and rotating it to capture all possible angles for both the right and left hands. In the future, we plan to create a guided feature to make it easier to add new handshapes.

### Handshape Art Generation

Also within the handshapes directory is a script named make_example. This script takes a PNG image of a hand demonstrating a handshape and converts it into an art piece consistent with the style displayed on the platform. This artwork serves as a guide, helping users understand the form of the hand for a particular sign. It contributes to enhancing the overall user experience and provides additional clarity on handshapes for sign language learners.

Examples of arts generated are found in public/handshapes.
