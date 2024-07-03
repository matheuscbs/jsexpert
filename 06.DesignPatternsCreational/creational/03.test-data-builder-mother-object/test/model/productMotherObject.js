const ProductDataBuilder = require("./productDataBuilder");

class ProductMotherObject {
  static valid() {
    return ProductDataBuilder.aProduct().build();
  }

  static withInvalidId() {
    return ProductDataBuilder.aProduct().withInvalidId(0).build();
  }

  static withInvalidName() {
    return ProductDataBuilder.aProduct().withInvalidName("").build();
  }

  static withInvalidPrice() {
    return ProductDataBuilder.aProduct().withInvalidPrice(0).build();
  }

  static withInvalidCategory() {
    return ProductDataBuilder.aProduct().withInvalidCategory("").build();
  }
}

module.exports = ProductMotherObject;
