import mocha from "mocha";
const { describe, it } = mocha;
import chai from "chai";
const { expect } = chai;
import Person from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Aviao,Navio 2000000 2021-01-01 2021-12-31"
    ).formatted("en-US");

    const expected = {
      id: 1,
      vehicles: "Bike, Aviao, and Navio",
      kmTraveled: "2,000,000 km",
      from: "January 01, 2021",
      to: "December 31, 2021",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      id: 1,
      vehicles: ["Bike", "Aviao", "Navio"],
      kmTraveled: 2000000,
      from: "2021-01-01",
      to: "2021-12-31",
    }).formatted("pt-BR");

    const expected = {
      id: 1,
      vehicles: "Bike, Aviao e Navio",
      kmTraveled: "2.000.000 km",
      from: "01 de janeiro de 2021",
      to: "31 de dezembro de 2021",
    };

    expect(person).to.be.deep.equal(expected);
  });
});
