const { describe, it } = require("mocha");
const { expect } = require("chai");
const Person = require("../src/person");

describe("Person", () => {
  it("should generate a person instance from a class", () => {
    const content = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo.",
    ];

    const result = new Person(content);
    const expected = {
      nome: "Xuxa da Silva",
      nacionalidade: "Brasileira",
      estadoCivil: "Casada",
      cpf: "235.743.420-12",
      endereco: {
        logradouro: "Rua dos bobos",
        numero: "zero",
        bairro: "Alphaville",
        cidade: "São Paulo",
      },
    };

    expect(result).to.be.deep.equal(expected);
  });
});
