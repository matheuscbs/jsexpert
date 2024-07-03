import { beforeEach, describe, jest, test } from "@jest/globals";
import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe("Test suite for Template Method design pattern", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("#OrderBusiness", () => {
    test("execution Order Business without Template Method", () => {
      const order = new Order({
        customerId: "1",
        amount: 100,
        product: [{ description: "A product" }],
      });

      const orderBusiness = new OrderBusiness();
      const isValid = orderBusiness._validateRequiredFields(order);
      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });
    test("execution Order Business with Template Method", () => {
      const order = new Order({
        customerId: "1",
        amount: 100,
        product: [{ description: "A product" }],
      });
      const orderBusiness = new OrderBusiness();
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      // com template method, a sequencia de passos é sempre executada
      // evita a replicaçao de código

      const result = orderBusiness.create(order);
      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});
