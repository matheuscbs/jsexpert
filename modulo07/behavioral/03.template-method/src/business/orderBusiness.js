import BaseBusiness from "./base/baseBusiness.js";

export default class OrderBusiness extends BaseBusiness {
  #order = new Set();
  _validateRequiredFields(data) {
    return data.customerId && !!data.amount && !!data.product.length;
  }

  _create(data) {
    this.#order.add(data);
    return true;
  }
}
