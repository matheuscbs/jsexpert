const assert = require("assert");
const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, "one")
  .set("Matheus", { text: "2" })
  .set(true, () => "hello");

// usando um constructor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

// console.log("myMap", myMap);
// console.log("myMap.get(1)", myMap.get(1));
assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Matheus"), { text: "2" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em Objects a chave só pode ser string oy symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: "Matheus" });
//console.log("get", myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "Matheus" });

// utilitários
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Ojbect é ({ name: "Matheus" }).hasOwnProperty("name")
assert.ok(myMap.has(onlyReferenceWorks));

// para remover um item do objeto
// delete item.id
// imperformático para o JS
assert.ok(myMap.delete(onlyReferenceWorks));

// Nao da para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Matheus", { text: "2" }],
    [true, () => {}],
  ])
);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object é inseguro, pois dependendo da key, pode substituir um comportamento
// ou pegar um comportamento nativo do objeto
// ({}).toString() === "[object Object]"
// ({ toString: () => "Hey" }).toString() === "Hey"
// ({ toString: () => "Hey" }).toString() === "[object Object]"
// JSON.stringify({ toString: () => "Hey" }) === "{}"

// Qualquer chave pode colidir, com as propriedades herdadas do Object.prototype
// Por isso é melhor usar null na herança
// Constructor, toString, ValueOf e etc

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Silva",
};

// Nao tem restricao de nome de chave
myMap.set(actor);

assert.deepStrictEqual(myMap.get(actor), undefined);
assert.throws(() => myMap.get(actor).toString, TypeError);

// Nao da para limpar um Obj sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --- WeakMap
// Pode ser coletados como garbage collector
// Usado em casos bem específicos
// As chaves precisam ser objetos
// Possuem apenas métodos simples
// Não são iteráveis

// Prever vazamentos de memória
// manter uma referencia fraca
// cache
// private members
// WeakMaps são importantes para implementação de WeakSets

const weakMap = new WeakMap();
const hero = { name: "Flash" };

weakMap.set(hero);
weakMap.get(hero);
weakMap.delete(hero);
weakMap.has(hero);
