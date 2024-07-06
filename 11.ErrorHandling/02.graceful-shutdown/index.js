import { createServer } from "http";
import { MongoClient } from "mongodb";
import { promisify } from "util";

async function dbConnect() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  console.log("Connected to the database");
  const db = client.db("comics");
  return {
    collections: { heroes: db.collection("heroes") },
    client,
  };
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      });
      const heroes = await collections.heroes.find().toArray();
      console.log("heroes", heroes);
      response.writeHead(200);
      response.write(JSON.stringify(heroes));
    } catch (error) {
      console.log("A request error has happened", error);
      response.writeHead(500);
      response.write(JSON.stringify({ message: "Internal Server Error" }));
      response.end();
    } finally {
      response.end();
    }
  }
}

// await client.close();
/*
  curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}'
*/

const server = createServer(handler).listen(3000, () => {
  console.log("Server is running on port 3000 and process", process.pid);
});

const onStop = async (signal) => {
  console.info(`${signal} signal received.`);

  console.log("Closing http server");
  await promisify(server.close.bind(server))();
  console.log("Http server has been closed");

  // close(true) => força o encerramento
  await client.close();
  console.log("Mongo connection has been closed");

  // zero é tudo certo, 1 é error!
  process.exit(0);
};

// SIGINT -> Crtl C
// SIGTERM -> kill pid
["SIGINT", "SIGTERM"].forEach((event) => {
  process.on(event, onStop);
});
