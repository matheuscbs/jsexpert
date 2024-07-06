const Chance = require("chance");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");
const { join } = require("path");
const { writeFile, readFile } = require("fs/promises");
const seederBaseFolder = join(__dirname, "../", "database");

const chance = new Chance();
const DEFAULT_ITEM_AMOUNT = 2;

const carCategory = new CarCategory({
  id: chance.guid(),
  name: chance.word({ syllables: 3 }),
  carIds: [],
  price: chance.floating({ fixed: 2, min: 20, max: 100 }),
});

const cars = [];
const customers = [];
for (let index = 0; index <= DEFAULT_ITEM_AMOUNT; index++) {
  const car = new Car({
    id: chance.guid(),
    name: chance.word(),
    available: true,
    gasAvailable: true,
    releaseYear: chance.year({ min: 2000, max: 2021 }),
  });

  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: chance.guid(),
    name: chance.name(),
    age: chance.age(),
  });

  customers.push(customer);
}

const write = (filename, data) => {
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));
};

(async () => {
  await write("cars.json", cars);
  await write("carCategories.json", [carCategory]);
  await write("customers.json", customers);

  console.log("cars", cars);
  console.log("carCategory", carCategory);
  console.log("customers", customers);
})();
