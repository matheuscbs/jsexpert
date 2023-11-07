9999999999999999 === 10000000000000000; // true

true + 2; // 3
"21" + true; // '21true'
"21" - true; // 20
"21" - -1; // 22
0.1 + 0.2 === 0.3; // false
3 > 2 > 1; // false
3 > 2 >= 1; // true
0.1 + 0.7 === 0.8; // false

"B" + "a" + +"a" + "a"; // 'BaNaNa'

"1" == 1; // true
"1" === 1; // false

null == undefined; // true
null === undefined; // false
// what a fuck js -> Existe todos esses casos

console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion to string");
console.assert(("hello" || 123) === "hello", "|| returns the first element!");
console.assert(("hello" && 123) === 123, "&& returns the last element!");

// --------------
const item = {
  name: "Matheus Cardoso",
  age: 28,
  // string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // number: 1 se nao for primitivo, chama o toString
  valueOf() {
    return { hey: "dude" };
    // return 107;
  },
  // ele tem prioridade na parada
  [Symbol.toPrimitive](coercionType) {
    // console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item));
// // vai retornar NaN pois o toString retornou a string
// console.log("valuOf", Number(item));

// // vai retornar o valor do Symbol.toPrimitive
// console.log("String", String(item));
// console.log("Number", Number(item));
// // chama a conversao default
// console.log("Date", new Date(item));

console.assert(item + 0 === '{"name":"Matheus Cardoso","age":28}0');
// console.log("!!item is true?", !!item);
console.assert(!!item);
// console.log("String(item) is true?", !!String(item));

// console.log("string.concat", "Ae".concat(item));
console.assert("Ae".concat(item) === 'Ae{"name":"Matheus Cardoso","age":28}');

// console.log("implicit + explicit coercion with == ", item == String(item));
console.assert(item == String(item), "coercion to string");

const item2 = { ...item, name: "Zezin" };
// console.log("New Object", item2);
// console.log("implicit + explicit coercion with == ", item == String(item2));
console.assert(item != item2, "objects are different");
