const sinon = require("sinon");
const Fibonacci = require("./fibonacci");
const assert = require("assert");

async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators retornam iterators, (.next)
    // existem 3 formas de ler os dados
    // usando as funções .next, for await e rest/spread
    for await (const i of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> PARA
    // [6] return 5
    // [7] return 3
    // [8] return 2
    // [9] return 1
    // [10] return 1
    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,      next: 2,
    });
    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
};
