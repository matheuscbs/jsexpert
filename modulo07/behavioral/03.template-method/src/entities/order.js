export default class Order {
  constructor({ customerId, amount, product }) {
    this.customerId = customerId;
    this.amount = amount;
    this.product = product;
  }
}
