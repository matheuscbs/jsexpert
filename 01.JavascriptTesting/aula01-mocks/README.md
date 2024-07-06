# Apostila de JavaScript: Módulo de Testes e Mocks

## Introdução ao Módulo 'javascript_expert'

Este módulo, denominado `javascript_expert`, é projetado para demonstrar e ensinar técnicas avançadas de testes em JavaScript, com foco especial em `mocks` e validação de arquivos CSV. O objetivo é fornecer um entendimento claro de como testes podem ser estruturados e como manipulações de arquivos podem ser testadas de maneira eficaz.

## O Que São Mocks?

Mocks são objetos que simulam o comportamento de objetos reais de maneira controlada. Em testes, mocks são usados para replicar a funcionalidade de componentes que não são o foco do teste, permitindo que o desenvolvedor se concentre exclusivamente na lógica que deseja testar. Isso é especialmente útil em testes de integração onde interações com bancos de dados ou arquivos são necessárias.

## Por Que Usar Mocks?

- **Isolamento**: Os mocks permitem que você teste componentes de maneira isolada, sem dependência de componentes externos.
- **Controle**: Eles proporcionam um ambiente controlado onde é possível simular diversas situações de teste, como comportamentos inesperados, erros e casos de limite.
- **Eficiência**: Testes com mocks tendem a ser mais rápidos que acessar bancos de dados reais ou sistemas de arquivos.

## Estrutura do Diretório `01.JavascriptTesting/aula01-mocks`

O diretório contém exemplos práticos que ilustram como aplicar mocks em testes de arquivos CSV. Os arquivos principais incluem:

- **features.txt**: Define os requisitos do arquivo CSV a ser testado.
- **index.test.js**: Contém os testes que utilizam mocks para simular a leitura de arquivos.
- **mocks/**: Diretório com arquivos CSV usados nos testes, variando entre válidos e inválidos para diferentes cenários.
- **src/**: Código-fonte com as funções de validação e conversão de CSV para JSON.

## Testando Arquivos CSV

O teste de arquivos CSV é uma prática comum em ambientes que processam grande quantidade de dados. Os testes garantem que os arquivos sejam lidos e parseados corretamente, aderindo a um formato esperado.

### Principais Desafios

- **Validação de Formato**: Garantir que o arquivo atenda a um esquema específico, incluindo tipos de dados e cabeçalhos de colunas.
- **Manipulação de Erros**: Tratar erros de leitura e parsing de maneira adequada.
- **Performance**: Assegurar que o processo de leitura e análise seja eficiente, especialmente com grandes volumes de dados.

## Exemplo de Teste

O teste abaixo ilustra como validar um arquivo CSV que deve ter no máximo três linhas de dados além do cabeçalho:

```js
const { rejects, deepStrictEqual } = require("assert");
const { error } = require("./src/constants");
const File = require("./src/file");

(async () => {
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeitems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Matheus Cardoso",
        id: 123,
        profession: "Software Engineer",
        birthDay: 1995,
      },
      {
        name: "John Doe",
        id: 321,
        profession: "Software Engineer",
        birthDay: 1993,
      },
      {
        name: "Maria Silva",
        id: 541,
        profession: "Software Engineer",
        birthDay: 1998,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
```

## Conclusão

Este módulo oferece uma base sólida para entender e aplicar testes em JavaScript, utilizando mocks para simular interações com arquivos. Ele serve como uma excelente introdução para desenvolvedores que desejam aprimorar suas habilidades em testes automatizados e garantir a qualidade de seus softwares.
