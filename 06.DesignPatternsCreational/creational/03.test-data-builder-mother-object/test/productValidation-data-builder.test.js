const { it, describe } = require("mocha");
const ProductDataBuilder = require("./model/productDataBuilder");
const { productValidator } = require("./../src");

describe("Test Data Builder", () => {
  let expect;

  before(async () => {
    ({ expect } = await import("chai"));
  });

  it("shouldn't return error with valid product", () => {
    const product = ProductDataBuilder.aProduct().build();

    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe("Product Validation Rules", () => {
    it("should return an object error when creating a Product with invalid id", () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build();

      const result = productValidator(product);

      const expected = {
        errors: ["ProductId: should be between 2 and 20 characters"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid name", () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build();

      const result = productValidator(product);

      const expected = {
        errors: ["Name: should be only words"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid price", () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build();

      const result = productValidator(product);

      const expected = {
        errors: ["Price: should be from zero to a thousand"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid category", () => {
      const product = ProductDataBuilder.aProduct()
        .withInvalidCategory()
        .build();

      const result = productValidator(product);

      const expected = {
        errors: ["Category: should be electronic or organic"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
