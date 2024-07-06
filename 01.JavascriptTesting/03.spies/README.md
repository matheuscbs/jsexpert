# Apostila de JavaScript: Módulo de Spies

## Introdução ao Uso de Spies em Testes

Este módulo do projeto `javascript_expert`, foca em demonstrar e ensinar o uso de **spies** em testes de JavaScript. Spies são uma ferramenta de teste que permitem aos desenvolvedores "espionar" as chamadas de métodos, permitindo verificar quantas vezes, com quais argumentos e em que contexto os métodos foram chamados.

## O Que São Spies?

Spies são funções que registram informações sobre como elas são chamadas. Podem ser usadas para monitorar chamadas a funções existentes sem alterar o comportamento dessas funções. Isso é útil para validar certas interações dentro do código durante os testes.

## Por Que Usar Spies?

- **Verificação de Interações**: Permite verificar se certas funções foram chamadas, quantas vezes foram chamadas, e com quais argumentos.
- **Testes de Comportamento**: Auxilia na validação do fluxo de execução e lógica dentro de métodos complexos.
- **Flexibilidade**: Spies podem ser temporários e podem ser aplicados sem alterar permanentemente as funções originais.

## Estrutura de Diretório e Arquivos Importantes

Este módulo inclui um exemplo de aplicação de spies na classe `Fibonacci`, que implementa uma sequência de Fibonacci usando um gerador.

- **fibonacci.js**: Define a classe `Fibonacci` com o método `execute` que é um gerador para a sequência de Fibonacci.
- **fibonacci.test.js**: Contém os testes para o método `execute` da classe `Fibonacci`, utilizando spies para monitorar suas chamadas.

## Exemplo Prático de Teste com Spies

O código a seguir ilustra como os spies são utilizados para monitorar o método `execute` da classe `Fibonacci` durante a execução dos testes:

```js
const sinon = require("sinon");
const Fibonacci = require("./fibonacci");
const assert = require("assert");

async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    for await (const i of fibonacci.execute(3)) {
    }
    const expectedCallCount = 4; // inclui a chamada inicial mais as chamadas recursivas
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({ input: 3, current: 1, next: 2 });
    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
};
```

## Conclusão

O módulo de spies oferece uma compreensão prática e teórica de como essas ferramentas podem ser utilizadas para testar interações dentro de métodos complexos, sem a necessidade de alterar o código fonte original. Spies são essenciais para testes comportamentais, especialmente em aplicações com lógicas interativas complexas.
