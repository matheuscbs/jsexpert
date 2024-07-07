import { randomBytes } from "crypto";
import Events from "events";
import { createServer } from "http";

const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

function onData() {
  getBytes();
  const items = [];
  // setInterval(function myInterval() {
  //   items.push(Date.now());
  // });
}

myEvent.on("data", onData);

const server = createServer(function handler(request, response) {
  myEvent.emit("data", Date.now());
  response.end("Ok");
});

server.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
