const { evaluateRegex } = require("./util");

class Person {
  constructor([nome, nacionalidade, estadoCivil, cpf, enderecoCompleto]) {
    const firstLetterExp = evaluateRegex(/^(\w)(.*)$/);

    const formatFirstLetter = (word) => {
      return word.replace(firstLetterExp, (fullMatch, group1, group2) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });
    };

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.cpf = cpf.replace(evaluateRegex(/CPF\s*/), "");

    const enderecoParts = enderecoCompleto
      .split(", ")
      .map((part) => part.trim());
    if (enderecoParts.length < 4) {
      throw new Error("Endereço incompleto fornecido ao construtor de Person.");
    }

    this.endereco = {
      logradouro: enderecoParts[0],
      numero: enderecoParts[1],
      bairro: enderecoParts[2].replace(evaluateRegex(/^bairro\s*/i), ""),
      cidade: enderecoParts[3].replace(evaluateRegex(/\.$/), ""),
    };
  }
}

module.exports = Person;
