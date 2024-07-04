import { createWriteStream } from "fs";
import { Readable, Transform } from "stream";

// fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 1e3; index++) {
      const person = {
        id: Date.now() + index,
        name: `Matheus-${index}`,
      };
      const data = JSON.stringify(person);
      this.push(data);
    }

    //informa que os dados acabaram
    this.push(null);
  },
});

// processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    callback(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return callback(null, chunk);
    }

    this.counter += 1;
    callback(null, "id,name\n".concat(chunk));
  },
});

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saida => imprimir, salvar, ignorar
  // .pipe(writable);
  .pipe(createWriteStream("./output.csv"));

pipeline.on("end", () => {
  console.log("Pipeline finalizado");
});
