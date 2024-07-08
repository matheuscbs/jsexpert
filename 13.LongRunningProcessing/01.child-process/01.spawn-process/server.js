import { randomUUID } from "crypto";
import { createWriteStream } from "fs";
import { createServer } from "http";
import { pipeline } from "stream/promises";

async function handler(request, response) {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(request, createWriteStream(fileName));

  response.end(`File ${fileName} uploaded successfully`);
}

createServer(handler).listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
