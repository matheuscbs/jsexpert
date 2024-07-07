# Apostila de JavaScript: TDD Avançado - Parte 3

## Introdução ao TDD Avançado

Na terceira parte do módulo TDD do projeto `javascript_expert`, exploramos o desenvolvimento e a implementação de testes avançados para uma aplicação de aluguel de carros. Esta seção enfoca a integração e validação de regras de negócio complexas através do TDD.

## Configuração de Cobertura de Testes

Utilizamos a ferramenta `nyc` para garantir uma cobertura completa de testes, com configurações estritas que requerem 100% de cobertura em linhas, funções, ramificações e declarações:

```json
{
  "branches": 100,
  "functions": 100,
  "lines": 100,
  "statements": 100,
  "check-coverage": true,
  "reporter": ["text", "html"],
  "exclude": ["src/repository/base/*.js"]
}
```

Essa configuração assegura que todos os aspectos importantes do código sejam testados, enquanto exclui partes do código que podem não necessitar de cobertura direta, como bases de repositórios.

## Entidades e Repositórios

Desenvolvemos várias entidades, como `Car`, `CarCategory`, `Customer`, e `Transaction`, e as utilizamos junto com repositórios para gerenciar a persistência e recuperação de dados:

`Car`: Veículos disponíveis para aluguel.
`CarCategory`: Categorias que agrupam diferentes tipos de carros.
`Customer`: Clientes que utilizam o serviço de aluguel.
`Transaction`: Registra os detalhes das transações de aluguel.

## Casos de Uso Implementados

Os casos de uso detalham os requisitos funcionais do sistema e como eles são validados através de testes:

# Caso de Uso 01: Seleção de Carro Disponível

Testa a funcionalidade de selecionar aleatoriamente um carro disponível de uma categoria específica.

# Caso de Uso 02: Cálculo do Preço Final

Calcula o preço final do aluguel baseado no número de dias e na idade do cliente, aplicando taxas específicas.

# Caso de Uso 03: Registro de Transação de Aluguel

Registra e verifica os detalhes de uma transação ao alugar um carro, incluindo dados do cliente, veículo escolhido, preço final e data de devolução.

## Implementação de Testes

Os testes são elaborados para cobrir todas as funcionalidades e cenários possíveis, usando a biblioteca sinon para mocks e stubs, e chai para asserções:

```js
describe("CarService Suite Tests", () => {
  it("should retrieve a random position from an array", () => {
    // Teste que verifica a funcionalidade de escolher uma posição aleatória
  });

  it("given a carCategory it should return an available car", async () => {
    // Teste que verifica se o carro retornado está disponível
  });

  it("given a carCategory, customer and numberOfDays it should calculate final amount in real", async () => {
    // Teste que verifica o cálculo correto do preço final
  });

  it("given a customer and a car category it should return a transaction receipt", async () => {
    // Teste que verifica se a transação é registrada corretamente
  });
});
```

## Conclusão

Esta parte do módulo de TDD avançado oferece insights profundos sobre como testes rigorosos podem garantir que uma aplicação não apenas atenda às expectativas de negócios, mas também seja robusta e confiável. A aplicação de TDD em cenários complexos como este demonstra sua eficácia em produzir software de alta qualidade.
