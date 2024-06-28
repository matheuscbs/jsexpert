// import FluentSQLBuilder from "../fluentsql/index.js";
// para importar do diretorio use o comando abaixo
// node --experimental-specifier-resolution=node index.js
import FluentSQLBuilder from "@matheuscbs/fluentsql";
import database from './database/data.json' with { type: 'json' };

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(["category"])
  .groupCount("category")
  .limit(2)
  .build();

console.table(result);
