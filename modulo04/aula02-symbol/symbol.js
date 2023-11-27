const assert = require("assert");

// symbol é um tipo primitivo, imutável e único
// pode ser usado como identificador para propriedades de objetos
// pode ser usado para criar propriedades privadas
// pode ser usado para criar constantes
// pode ser usado para criar enum
// pode ser usado para criar metadados
// -- Keys
const uniqueKey = Symbol("userName"); // metadado
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for symbol";

// console.log("getting normal object value: ", user.userName);
// sempre único em nivel de endereco de memoria
// console.log("getting symbol object value: ", user[uniqueKey]);

assert.deepStrictEqual(user.userName, "value for normal Objects");
// sempre único em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for symbol");

// é dificil de pegar, mas não é secreto
// console.log("symbols", Object.getOwnPropertySymbols(user));
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

// -- Well Known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo item
        value: this.items.pop(),
      };
    },
  }), // Faz o for of funcionar e também o spread operator
};

// for (const item of obj) {
//   console.log("item", item);
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"]);
const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((dateArray) => {
      const [year, month, day] = dateArray;
      return new Date(year, month - 1, day);
    });
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const items = this[kItems].map((item) => {
      if (isNaN(item.getTime())) {
        throw new Error("Data inválida");
      }
      return new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item);
    });

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
}

const myDate = new MyDate(
  [2020, 3, 1], // 1º de março de 2020
  [2018, 2, 2] // 2 de fevereiro de 2018
);

const expectedDates = [new Date(2020, 2, 1), new Date(2018, 1, 2)];

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object Object]"
);
assert.throws(() => myDate + 1, TypeError);

// console.log("expectedDates", expectedDates);

// console.log("String(myDate)", String(myDate));
// Coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(
  String(myDate),
  "01 de março de 2020 e 02 de fevereiro de 2018"
);

// Implementar o Iterator!
assert.deepStrictEqual([...myDate], expectedDates);

// (async () => {
//   for await (const item of myDate) {
//     console.log("asyncIterator", item);
//  }
// })();

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();
