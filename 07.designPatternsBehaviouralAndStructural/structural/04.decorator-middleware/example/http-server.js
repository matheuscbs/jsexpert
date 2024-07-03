InjectHttpInterceptor();

import http from "http";
import { InjectHttpInterceptor } from "../index.js";

function handleRequest(request, response) {
  // response.setHeader("X-Instrumented-By", "Matheus Cardoso");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World\n");
}

const server = http.createServer(handleRequest);
const port = 8080;

server.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
