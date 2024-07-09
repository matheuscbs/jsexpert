import axios from "axios";
import sharp from "sharp";
import { parentPort } from "worker_threads";

async function downloadFile(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return response.data;
}

async function onMessage({ image, background }) {
  const imageBuffer = await sharp(await downloadFile(image)).toBuffer();
  const backgroundBuffer = await sharp(
    await downloadFile(background)
  ).toBuffer();

  const compositeImageBuffer = await sharp(backgroundBuffer)
    .composite([{ input: imageBuffer, gravity: sharp.gravity.south }])
    .toBuffer();

  parentPort.postMessage(compositeImageBuffer.toString("base64"));
}

parentPort.on("message", (message) => onMessage(message));
