# Apostila de JavaScript: TDD Avançado - Parte 2

## Introdução ao Desenvolvimento Orientado por Testes Avançado (TDD)

Esta segunda parte do módulo TDD do projeto `javascript_expert` continua a explorar técnicas avançadas de TDD, aplicando testes em um contexto mais complexo que envolve interações entre entidades e repositórios de dados.

## Estrutura de Diretório e Arquivos Importantes

Este módulo aprofunda a implementação de TDD para um sistema de aluguel de carros, utilizando várias entidades e repositórios para gerenciar estados e comportamentos complexos.

### Entidades

- **Car**: Representa os carros disponíveis para aluguel.
- **CarCategory**: Categorias disponíveis de carros, que incluem vários modelos.
- **Customer**: Clientes que podem alugar carros.

### Repositórios

- **BaseRepository**: Uma classe base para repositórios que facilita a leitura e escrita de dados.

### Serviços

- **CarService**: Serviços relacionados ao gerenciamento de carros, incluindo seleção aleatória e verificação de disponibilidade.

### Testes

Os testes unitários e de integração asseguram que o comportamento do sistema está conforme esperado, validando funcionalidades através de casos de uso detalhados.

## Casos de Uso

A implementação do TDD nesta parte foca em garantir que os requisitos funcionais sejam cumpridos. Os principais casos de uso incluem:

### Caso de Uso 01: Seleção Aleatória de Carros

Garante que um carro seja escolhido aleatoriamente de uma categoria específica.

### Caso de Uso 02: Cálculo do Preço de Aluguel

Calcula o preço final do aluguel com base na duração do aluguel e na idade do cliente, aplicando impostos conforme necessário.

### Caso de Uso 03: Registro de Transação de Aluguel

Registra os detalhes de uma transação de aluguel, incluindo dados do cliente, carro selecionado, preço final e data de devolução.

## Implementação TDD

A abordagem TDD é aplicada para desenvolver e refinar esses serviços e repositórios. Aqui estão alguns exemplos de como os testes guiam a implementação:

### Teste de Seleção Aleatória de Carros

```js
it("should retrieve a random position from an array", () => {
  const data = [0, 1, 2, 3, 4];
  const result = carService.getRandomPositionFromArray(data);
  expect(result).to.be.lte(data.length).and.be.gte(0);
});

it("should choose the first id from carIds in carCategory", () => {
  const carCategory = mocks.validCarCategory;
  const carIdIndex = 0;
  sandbox
    .stub(carService, carService.getRandomPositionFromArray.name)
    .returns(carIdIndex);
  const result = carService.chooseRandomCar(carCategory);
  const expected = carCategory.carIds[carIdIndex];
  expect(result).to.be.equal(expected);
});
```

## Teste de Disponibilidade de Carros

```js
it("given a carCategory it should return an available car", async () => {
  const car = mocks.validCar;
  const carCategory = Object.create(mocks.validCarCategory);
  carCategory.ids = [car.id];
  sandbox
    .stub(carService.carRepository, carService.carRepository.find.name)
    .resolves(car);
  const result = await carService.getAvailableCar(carCategory);
  const expected = car;
  expect(result).to.be.deep.equal(expected);
});
```

## Conclusão

A segunda parte do módulo TDD do projeto javascript_expert fornece um entendimento mais profundo de como aplicar TDD em sistemas mais complexos, garantindo que todos os componentes do software funcionem harmoniosamente e atendam aos requisitos funcionais de maneira eficaz e eficiente.
