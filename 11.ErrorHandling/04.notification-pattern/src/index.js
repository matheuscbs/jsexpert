// 11.ErrorHandling/03.custom-error-types/index.js
import { createServer } from "http";

import HeroEntity from "./heroEntity.js";
import { statusCodes } from "./util/httpStatusCodes.js";

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data);

      if (Reflect.has(parsedData, "connectionError")) {
        throw new Error("Error connecting to the database");
      }

      const hero = new HeroEntity(parsedData);
      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(hero.notifications.join("\n"));
        return;
      }

      // cadastra no banco de dados
      response.writeHead(statusCodes.OK);
      response.end("Hero is valid");
    } catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end("Internal Server Error");
      return;
    }
  }
}

createServer(handler).listen(3000, () => {
  console.log("Server is running on port 3000");
});
