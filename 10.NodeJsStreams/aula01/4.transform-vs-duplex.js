import { Duplex, Transform } from "stream";

let count = 0;
const server = Duplex({
  objectMode: true, // faz nao precisar trabalhar com buffer => gasta mais memoria
  enconding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Matheus[${count}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },
  // é como se fosse um objeto completamente diferente!

  write(chunk, enconding, callback) {
    console.log(`[writable] saving`, chunk);
    callback();
  },
});

// provar que são canais de comunicacao diferentes
// write aciona o writable do Duplex
server.write("[Duplex] hey this is a writable!\n");
// on data -> loga o que rolou no .push do readable
// server.on("data", (msg) => console.log(`[readable]${msg}`));

// o push deixa voce enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`);
// server.pipe(process.stdout);

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enconding, callback) {
    callback(null, chunk.toUpperCase());
  },
});

// O transform é também um duplex, mas não possue comunicação independente
transformToUpperCase.write(`[transform] hello from write!\n`);

// o push vai ignorar o que voce tem na funcao transform
transformToUpperCase.push(`[transform] hello from push!\n`);

server
  .pipe(transformToUpperCase)
  // redireciona todos os dados de radable para writable da duplex
  .pipe(server);
