const assert = require("assert");
const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funções explicitas
console.log("new Object() is {}?", new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência do objeto que possui as propriedades nele
console.log(
  "obj.__proto__ === Object.prototype",
  obj.__proto__ === Object.prototype
);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

// __proto__ é a referência do objeto que possui as propriedades nele
console.log(
  "arr.__proto__ === Array.prototype",
  arr.__proto__ === Array.prototype
);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

// __proto__ é a referência do objeto que possui as propriedades nele
console.log(
  "fn.__proto__ === Function.prototype",
  fn.__proto__ === Function.prototype
);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// o __proto__ de Object.prototype é null
console.log(
  "obj.__proto__.__proto__ === null",
  obj.__proto__.__proto__ === null
);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

// ------------
console.log("-------");
function Employee() {}
Employee.prototype.salary = () => "salary**";

function Supervisor() {}
// Supervisor.prototype = Employee.prototype;
// Supervisor.prototype.__proto__ = Employee.prototype;
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";

function Manager() {}
// Manager.prototype = Supervisor.prototype;
// Manager.prototype.__proto__ = Supervisor.prototype;
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// Instâncias
const manager = new Manager();
const supervisor = new Supervisor();
const employee = new Employee();

// podemos chamar via prototype, mas se tentarmos chamar direto dá erro!
console.log("Mnager.prototype.salary()", Manager.prototype.salary());
// console.log("manager.prototype.salary()", manager.salary());

// se não chamar o 'new', o primeiro __proto__ vai ser sempre Function
// a instancia de Function, sem herdar nossas classes, por isso não vai encontrar
// Para acessar as classes sem o new, pode acessar diretamente via prototype
console.log(
  "Manager.prototype.__proto__ === Employee.prototype",
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);
console.log("-------");

// quando chamamos o 'new' o __proto__ recebe o prototype
console.log(
  "manager.__proto__: %s, manager.salary(): %s",
  new Manager().__proto__,
  manager.salary()
);
console.log(
  "Supervisor.prototype === new Manager().__proto__.__proto__",
  Supervisor.prototype === manager.__proto__.__proto__
);
assert.deepStrictEqual(Supervisor.prototype, manager.__proto__.__proto__);

console.log("-------");

console.log("manager.salary()", manager.salary());
console.log("manager.profitShare()", manager.profitShare());
console.log("manager.monthlyBonuses()", manager.monthlyBonuses());

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

console.log("-------");
class T1 {
  ping() {
    return "ping";
  }
} // T1.__proto__ === Function.prototype

class T2 extends T1 {
  pong() {
    return "pong";
  }
} // T2.__proto__ === T1

class T3 extends T2 {
  shoot() {
    return "shoot";
  }
} // T3.__proto__ === T2

const t3 = new T3();
console.log(
  "t3 inherits null?",
  t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
);
console.log("t3.ping()", t3.ping());
console.log("t3.pong()", t3.pong());
console.log("t3.shoot()", t3.shoot());

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);
