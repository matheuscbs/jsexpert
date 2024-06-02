const { describe, it } = require("mocha");
const { expect } = require("chai");
const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");
const mock = require("./mock/valid");

describe("TextProcessorFluentAPI test suite", () => {
  it("#build", () => {
    const result = new TextProcessorFluentAPI(mock).build();
    expect(result).to.be.deep.equal(mock);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build();
    const expected = [
      "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e\n" +
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.",
      "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e\n" +
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo.",
      "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e\n" +
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.",
    ];
    expect(result).to.be.deep.equal(expected);
  });

  it("#divideTextInColumns", () => {
    const content = [
      "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e\n" +
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.",
      "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e\n" +
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo.",
      "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e\n" +
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.",
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();
    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e\ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo.",
      ],
      [
        "Arya Robbin",
        " belga",
        " casado",
        " CPF 884.112.200-52",
        " residente e\ndomiciliada a Av. paulista",
        " 1400",
        " bairro Consolação",
        " São Paulo.",
      ],
      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e\ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo.",
      ],
    ];
    expect(result).to.be.deep.equal(expected);
  });

  it("#removeEmptyCharacters", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e\ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo.",
      ],
      [
        "Arya Robbin",
        " belga",
        " casado",
        " CPF 884.112.200-52",
        " residente e\ndomiciliada a Av. paulista",
        " 1400",
        " bairro Consolação",
        " São Paulo.",
      ],
      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e\ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build();
    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
      [
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo.",
      ],
      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];
    expect(result).to.be.deep.equal(expected);
  });

  it("#mapPerson", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
      [
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo.",
      ],
      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();

    const expected = [
      {
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
      },
      {
        nome: "Arya Robbin",
        nacionalidade: "Belga",
        estadoCivil: "Casado",
        cpf: "884.112.200-52",
        endereco: {
          logradouro: "Av. paulista",
          numero: "1400",
          bairro: "Consolação",
          cidade: "São Paulo",
        },
      },
      {
        nome: "Júlia Menezes",
        nacionalidade: "Brasileira",
        estadoCivil: "Solteira",
        cpf: "297.947.800-81",
        endereco: {
          logradouro: "Av. dos Estados",
          numero: "99",
          bairro: "Jardins",
          cidade: "São Paulo",
        },
      },
    ];
    expect(result).to.be.deep.equal(expected);
  });

  it("#mapPerson should handle errors when data is incomplete", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "Rua dos bobos", // Dados incompletos
        "zero",
        // Faltando 'bairro' e 'cidade'
      ],
    ];

    const fluentAPI = new TextProcessorFluentAPI(content);
    expect(() => fluentAPI.mapPerson().build()).to.throw(
      "Endereço incompleto fornecido ao construtor de Person."
    );
  });

  it("#mapPerson should handle errors for each possible missing data scenario", () => {
    const incompleteDataSets = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "Rua dos bobos",
        "zero",
      ],
      ["Xuxa da Silva", "brasileira", "casada", "CPF 235.743.420-12"],
    ];

    incompleteDataSets.forEach((dataSet) => {
      const fluentAPI = new TextProcessorFluentAPI([dataSet]);
      expect(() => fluentAPI.mapPerson().build()).to.throw(
        "Endereço incompleto fornecido ao construtor de Person."
      );
    });
  });
});
