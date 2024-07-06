import Benchmark from "benchmark";
import database from "../database.js";
import CartPriceNew from "./cart-price-new.js";
import CartPriceOld from "./cart-price-old.js";

const suite = new Benchmark.Suite();

// suite
//   .add("Cart#cartIdUUID", function () {
//     new CartIdOld();
//   })
//   .add("Cart#cartIdCrypto", function () {
//     new CartIdNew();
//   })
//   .on("cycle", function (event) {
//     console.log(String(event.target));
//   })
//   .on("complete", function () {
//     console.log("Fastest is " + this.filter("fastest").map("name"));
//   })
//   .run();

const data = {
  products: [
    {
      id: "ae",
      n: undefined,
      abc: undefined,
      a: null,
      b: null,
    },
    {
      id: "ae",
      n: undefined,
      abc: undefined,
      a: null,
      b: null,
    },
    {
      id: "ae",
      n: undefined,
      abc: undefined,
      a: null,
      b: 123,
    },
  ],
};

// suite
//   .add("Cart#rmEmptyPropsMapsReduce", function () {
//     new CartRmPropOld(data);
//   })
//   .add("Cart#rmEmptyPropsFor", function () {
//     new CartRmPropNew(data);
//   })
//   .on("cycle", function (event) {
//     console.log(String(event.target));
//   })
//   .on("complete", function () {
//     console.log("Fastest is " + this.filter("fastest").map("name"));
//   })
//   .run({ async: true });

suite
  .add("Cart#calcPriceMapsReduce", function () {
    new CartPriceOld(database);
  })
  .add("Cart#calcPriceFor", function () {
    new CartPriceNew(database);
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
