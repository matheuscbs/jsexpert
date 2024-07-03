// o objetivo do Fluent API é executar métodos em sequência
// como um pipeline, step by step
// e no fim, chama o build. Muito similar ao padrão Builder
// a diferença que aqui é sobre métodos encadeados,

const { evaluateRegex } = require("./utils");
const Person = require("./person");

// o Builder sobre a construção de objetos
class TextProcessorFluentAPI {
  // propriedade privada!
  #content;
  constructor(content) {
    this.#content = content;
  }
  extractPeopleData() {
    // ?<= vai extrair os dados que virao depois desse grupo
    // [contratada|contratante]:\s{1} vai extrair contratada ou contratante
    // :\s{1} vai extrair os dois pontos e um espaço
    // .*\n pega qualquer coisa até o final da linha
    // .*? non greety, esse ? faz com que ele pare na primeira ocorrência, assim ele evita ficar em loop
    // (?!s) negative lookahead para não pegar espaços em branco
    // $ informar que é o final da linha
    // g -> global, pega todas as ocorrências
    // i -> case insensitive
    // m -> multiline
    const matchPerson =
      /(?<=(?:contratada|contratante):\s{1})(?!\s)(.*\n.*?)$/gim;
    // faz o match para encontrar a string inteira que contém os dados que precisamos
    this.#content = this.#content.match(matchPerson);
    // console.log("onlyPerson", matchPerson.test(this.#content));
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));
    return this;
  }

  removeEmptyCharacters() {
    this.#content = this.#content.map((line) =>
      line.map((entry) => entry.replace(/\s+/g, " ").trim())
    );
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((person) => {
      return new Person(person);
    });
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
