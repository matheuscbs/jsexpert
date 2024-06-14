const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // o default sao os dados corretos
    // o caso de sucesso
    this.productData = {
      id: "abc",
      name: "valid name",
      price: 10,
      category: "electronic",
    };
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = "";
    return this;
  }

  withInvalidName() {
    this.productData.name = "123";
    return this;
  }

  withInvalidPrice() {
    this.productData.price = -10;
    return this;
  }

  withInvalidCategory() {
    this.productData.category = "invalid category";
    return this;
  }

  build() {
    const product = new Product(this.productData);

    return product;
  }
}

module.exports = ProductDataBuilder;
