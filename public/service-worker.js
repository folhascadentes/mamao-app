self.addEventListener("message", async (event) => {
  const { data } = event;

  // Process the incoming data
  try {
    const images = [];
    for (let image of data.frames) {
      const base64 = await imageDataToJPEGBase64(image);
      images.push(base64);
    }
    console.log(images);

    await sendPostRequest("http://localhost:4000", { data: images });
  } catch (e) {
    console.log(e);
  }

  // Send the result back to the main thread
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

function sendPostRequest(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
