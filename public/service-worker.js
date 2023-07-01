self.addEventListener("message", async (event) => {
  const { data } = event;

  try {
    const images = [];
    for (let image of data.frames) {
      const base64 = await imageDataToJPEGBase64(image);
      images.push(base64);
    }

    await sendPostRequest(
      `${data.url}/upload`,
      {
        frames: images,
        landmarks: data.landmarks,
        language: data.language,
        token: data.token,
      },
      {
        authorization: data.accessToken,
      }
    );
  } catch (e) {
    console.log(e);
  }
});

async function imageDataToJPEGBase64(imageData) {
  let canvas = new OffscreenCanvas(imageData.width, imageData.height);
  let ctx = canvas.getContext("2d");

  ctx.putImageData(imageData, 0, 0);

  return await convertToBase64(canvas);
}

function convertToBase64(canvas) {
  return new Promise((resolve, reject) => {
    canvas.convertToBlob({ type: "image/jpeg" }).then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  });
}

function sendPostRequest(url, data, headers) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
