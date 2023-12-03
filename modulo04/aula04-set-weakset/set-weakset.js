const assert = require("assert");

// usado na maioria das vezes para Listas de itens unicos

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);
//console.log("arr3", arr3);

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

// agora vamos usar o Set para fazer essa lista
const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

//console.log("Set with add item by item", set);
// nao aceita repeticao de valor
// é exibido como um objeto, mas é um Set
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);

// outra forma de fazer
const set2 = new Set([...arr1, ...arr2]);
//console.log("Set with array spread", set2);
assert.deepStrictEqual(Array.from(set2), ["0", "1", "2", "3"]);

//console.log("set.keys", set.keys());
//console.log("set.values", set.values()); // só existe por conta do Map

// no array comum, para verificar se um item existe
// [1, 2, 3].includes(3) // true
// [].indexOf("1") !== -1 ou [0].includes(0)

assert.ok(set.has("3"));

// mesma teoria do map, mas você sempre trabalha com a lista toda
// não tem get, então você pode saber se o item está ou não no array
// mas não consegue recuperar o valor de forma direta
// só se você fizer um [...set][0] que retorna o primeiro item do array
// ou transformar em array

const users01 = new Set([
  "Matheus",
  "Maria",
  "Jose",
  "Matheus",
  "Maria",
  "Jose",
]);

const users02 = new Set(["Matheus", "Dracs", "Drogo"]);

const intersection = new Set([...users01].filter((user) => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ["Matheus"]);

const difference = new Set([...users01].filter((user) => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ["Maria", "Jose"]);

// weakSet

// mesma ideia do weakMap
// não é enumerável (iterável)
// só trabalha com chaves como referência
// só faz sentidos em alguns casos de uso específico
// não tem como saber o tamanho da lista de itens
// só tem métodos simples
const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);
