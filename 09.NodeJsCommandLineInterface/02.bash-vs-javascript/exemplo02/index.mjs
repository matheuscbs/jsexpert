$.verbose = false;
import safeRegex from "safe-regex";
import { setTimeout } from "timers/promises";

const isSafe = (regex) => safeRegex(regex);

await $`docker run -p "8080:80" -d nginx`;
await setTimeout(500);
const req = await $`curl --silent "localhost:8080"`;
console.log(`req\n`, req.stdout);

const containers = await $`docker ps`;

const exp = /(?<containerId>\w+)\W+(?=nginx)/;
// const exp = /(?<containerId>\w+)\W+(?=nginx)(x+x+)+y/; //unsafe regex
if (!isSafe(exp.source)) {
  throw new Error("Regex is unsafe");
}

const {
  groups: { containerId },
} = containers.toString().match(exp);
console.log(`containerId\n`, containerId);

const logs = await $`docker logs ${containerId}`;
console.log(`logs\n`, logs.stdout);

const stopped = await $`docker stop ${containerId}`;
console.log("Container stopped", stopped.stdout);

const rm = await $`docker rm ${containerId}`;
console.log("Container removed", rm.stdout);
