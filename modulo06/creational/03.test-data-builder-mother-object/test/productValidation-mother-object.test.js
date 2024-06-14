const { it, describe } = require("mocha");
const ProductMotherObject = require("./model/productMotherObject");
const { productValidator } = require("./../src");

describe("Test Mother Object", () => {
  let expect;

  before(async () => {
    ({ expect } = await import("chai"));
  });

  it("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.valid();

    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe("Product Validation Rules", () => {
    it("should return an object error when creating a Product with invalid id", () => {
      const product = ProductMotherObject.withInvalidId();

      const result = productValidator(product);

      const expected = {
        errors: ["ProductId: should be between 2 and 20 characters"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid name", () => {
      const product = ProductMotherObject.withInvalidName();

      const result = productValidator(product);

      const expected = {
        errors: ["Name: should be only words"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid price", () => {
      const product = ProductMotherObject.withInvalidPrice();

      const result = productValidator(product);

      const expected = {
        errors: ["Price: should be from zero to a thousand"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid category", () => {
      const product = ProductMotherObject.withInvalidCategory();

      const result = productValidator(product);

      const expected = {
        errors: ["Category: should be electronic or organic"],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
