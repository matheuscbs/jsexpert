"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments)); // Array.prototype.slice.call(arguments) === [...arguments]
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readfile(filename)).toString());
// });

const file = new File(); // file.__proto__ === File.prototype

// dessa forma, ele ignora o 'this' da classe File
//watch(__filename, file.watch(file));

// alternativa para nao herdar o this da funcao watch
// mas fica feio!
// watch(__filename, (event, filename) => file.watch(event, filename));

// podemos deixar explicito qual é o contexto que queremos chamar a funcao
// dessa forma, o this da funcao watch, vai ser o this da classe File
// watch(__filename, file.watch.bind(file));

// podemos usar o call, que recebe como primeiro parametro o contexto
// dessa forma, o this da funcao watch, vai ser o this da classe File
file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
);

// podemos usar o apply, que recebe como primeiro parametro o contexto
// dessa forma, o this da funcao watch, vai ser o this da classe File
file.watch.apply({ showContent: () => console.log("apply: hey sinon!") }, [
  null,
  __filename,
]);
