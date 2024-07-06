// 11.ErrorHandling/03.custom-error-types/index.js
import { createServer } from "http";
import BusinessError from "./errors/businessError.js";
import { statusCodes } from "./util/httpStatusCodes.js";

function validateHero(hero) {
  // simulando um outro erro, por exemplo de banco de dados
  if (Reflect.has(hero, "connectionError")) {
    // só um erro generico para trazer outro cenário de error inesperado
    throw new Error("Error connecting to the database");
  }

  if (hero.age < 20) {
    throw new BusinessError("Hero must be older than 20 years old");
  }

  if (hero.name?.length < 4) {
    throw new BusinessError("Hero name must have at least 4 characters");
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      response.writeHead(statusCodes.OK);
      response.end("Hero is valid");
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(error.message);
        return; // Ensuring the response ends here
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end("Internal Server Error");
      return; // Ensuring the response ends here
    }
  }
}

createServer(handler).listen(3000, () => {
  console.log("Server is running on port 3000");
});
