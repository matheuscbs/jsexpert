import { createServer } from "http";
import { dirname } from "path";
import { fileURLToPath, parse } from "url";
import { Worker } from "worker_threads";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0)
        reject(
          new Error(`Thread ${worker.threadId} stopped with code ${code}`)
        );
    });
  });
}

async function handler(request, response) {
  if (request.url.includes("joinImages")) {
    const {
      query: { background, image },
    } = parse(request.url, true);
    const imageBase64 = await joinImages({ background, image });

    response.writeHead(200, {
      "Content-Type": "text/html",
    });

    response.end(
      `<img style="width:100%;height:100%" src="data:image/png;base64,${imageBase64}" />`
    );
    return;
  }

  return response.end("ok");
}

const server = createServer(handler);
server.listen(3000, () =>
  console.log("Server started at http://localhost:3000")
);
