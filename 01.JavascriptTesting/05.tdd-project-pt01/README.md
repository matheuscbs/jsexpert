# Apostila de JavaScript: Introdução ao TDD - Parte 1

## Introdução ao Desenvolvimento Orientado por Testes (TDD)

Este módulo do projeto `javascript_expert` explora os conceitos básicos de Desenvolvimento Orientado por Testes (TDD), onde os testes são escritos antes mesmo do código de produção. TDD ajuda a garantir que o sistema atenda aos requisitos definidos e promove um design de software mais limpo e testável.

## O Que É TDD?

TDD é uma técnica de desenvolvimento de software que envolve três atividades repetidas: escrever um teste que falha, escrever o código que faz o teste passar e refatorar o código enquanto garante que os testes continuem passando.

## Estrutura de Diretório e Arquivos Importantes

Este módulo contém um projeto prático que simula um sistema de locação de carros, demonstrando como implementar TDD em um cenário real.

### Entidades e Base de Dados

- **Entidades**: Classes como `Car`, `CarCategory`, e `Customer` representam as entidades básicas do domínio.
- **Base de Dados**: Arquivos JSON simulam uma base de dados incluindo categorias de carros, carros e clientes.

### Casos de Uso

Os casos de uso descrevem as funcionalidades do sistema de locação de carros, desde a escolha de um carro disponível até o cálculo do preço final do aluguel, considerando impostos baseados na idade do cliente.

## Exemplo de Implementação TDD

A seguir, um exemplo que ilustra a abordagem TDD através da definição de casos de uso para o sistema de locação de carros:

### Story: Renting a car

#### Use Case 01

- **Objetivo**: Obter um carro disponível em uma categoria específica.
- **Dado**: Uma categoria de carro contendo 3 carros diferentes.
- **Quando**: Verificar se há um carro disponível.
- **Então**: Deve escolher aleatoriamente um carro da categoria escolhida.

#### Use Case 02

- **Objetivo**: Calcular o preço final do aluguel.
- **Dado**: Um cliente deseja alugar um carro por 5 dias e tem 50 anos.
- **Quando**: Ele escolhe uma categoria de carro que custa $37,6 por dia.
- **Então**: O preço final deve incluir o imposto de 30% sobre a idade do cliente, resultando em "R$244,40".

#### Use Case 03

- **Objetivo**: Registrar uma transação de aluguel.
- **Dado**: Um cliente cadastrado de 50 anos, um modelo de carro que custa $37,6 por dia, e uma data de entrega para 5 dias atrás.
- **Quando**: Alugar um carro.
- **Então**: Deve exibir os dados do cliente, o carro selecionado, o preço final e a data de devolução formatada em português brasileiro como "10 de novembro de 2020".

## Conclusão

Este módulo oferece uma introdução prática ao TDD, mostrando como essa metodologia pode ser aplicada para desenvolver software de maneira eficaz e eficiente. Através dos casos de uso detalhados e das entidades envolvidas, é possível entender como o TDD orienta o desenvolvimento de funcionalidades específicas e garante que todos os aspectos do software sejam testados e validados desde o início.
