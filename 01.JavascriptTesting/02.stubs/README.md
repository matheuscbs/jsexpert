# Apostila de JavaScript: Módulo de Stubs

## Introdução ao Uso de Stubs em Testes

Este módulo, parte do projeto `javascript_expert`, é dedicado a demonstrar e ensinar o uso de **stubs** em testes de JavaScript. Stubs são uma forma de test doubles, ou seja, substitutos para peças de código que imitam e controlam o comportamento de componentes reais de maneira isolada.

## O Que São Stubs?

Stubs são objetos ou funções que simulam a resposta de módulos externos ou partes do sistema que não são o foco do teste. Ao contrário dos mocks, que também verificam se certas funções foram chamadas, os stubs primariamente fornecem respostas controladas a chamadas de funções.

## Por Que Usar Stubs?

- **Isolamento**: Permite testar componentes em isolamento, sem a necessidade de interações externas reais, como chamadas de API ou acessos ao banco de dados.
- **Previsibilidade**: Stubs garantem que os testes não falhem devido a inconsistências externas, como falhas de rede ou mudanças em APIs externas.
- **Simplicidade**: Simplifica os testes ao permitir que os desenvolvedores imitem respostas específicas para cenários de teste, sem complicar o ambiente de teste com configurações externas.

## Estrutura de Diretório e Arquivos Importantes

Este módulo inclui exemplos práticos que demonstram a implementação e uso de stubs em um serviço que faz requisições HTTPS para obter dados de planetas de um API externa.

- **service.js**: Implementa a classe `Service` que faz requisições HTTPS e processa os dados.
- **service.test.js**: Contém os testes para `Service` utilizando stubs para simular as respostas das requisições HTTPS.
- **mocks/**: Diretório com arquivos JSON simulando respostas da API, como `tatooine.json` e `alderaan.json`.

## Exemplo Prático de Teste com Stubs

Abaixo, um exemplo de como os stubs são aplicados nos testes:

```js
const Service = require("./service");
const { deepStrictEqual } = require("assert");
const sinon = require("sinon");

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

const mocks = {
  tatooine: require("./mocks/tatooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };

    const results = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };
    const results = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(results, expected);
  }
})();
```

## Conclusão

Este módulo oferece uma introdução abrangente ao uso de stubs em testes de JavaScript. Ao utilizar stubs, os desenvolvedores podem garantir a confiabilidade e a eficiência dos testes, isolando o código sob teste de dependências externas imprevisíveis. Stubs são essenciais para uma estratégia de teste robusta, especialmente em aplicações que dependem de serviços externos.
