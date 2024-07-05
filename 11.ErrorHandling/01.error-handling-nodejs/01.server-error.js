import Http from "http";

let count = 1;

async function handler(request, response) {
  count++;
  try {
    if (count % 2 === 0) {
      await Promise.reject("Error dentro do handler");
    }
    for await (const data of request) {
      try {
        if (count % 2 === 0) {
          await Promise.reject("Error dentro do for");
        }
        response.write(data);
      } catch (error) {
        console.log("A request inside the for loop", error);
        response.writeHead(400);
        response.write(JSON.stringify({ message: "Bad Request" }));
      } finally {
        response.end();
      }
    }
  } catch (error) {
    console.log("A server error has happened", error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: "Internal Server Error" }));
    response.end();
  }
}

Http.createServer(handler).listen(3000, () => {
  console.log("Server is running on port 3000");
});
