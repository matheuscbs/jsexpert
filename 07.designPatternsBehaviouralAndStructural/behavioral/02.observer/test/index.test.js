import { describe, expect, jest, test } from "@jest/globals";
import Payment from "../src/events/payment";
import Marketing from "../src/observers/marketing";
import Shipment from "../src/observers/shipment";
import PaymentSubject from "../src/subject/paymentSubject";
describe("Test Suite for Observer Pattern", () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {});
  });
  test("#PaymentSubject notify observer", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    const data = "Hello World";
    const expected = data;
    subject.subscribe(observer);
    subject.notify(data);
    expect(observer.update).toHaveBeenCalledWith(expected);
  });
  test("#PaymentSubject should not unsubscribed observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    const data = "Hello World";

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);
    expect(observer.update).not.toHaveBeenCalled();
  });
  test("#Payment should notify subject after a credit card transaction", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);
    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    );
    const data = { userName: "Matheus Cardoso", id: Date.now() };
    payment.creditCard(data);
    expect(paymentSubjectNotifierSpy).toHaveBeenCalled();
  });
  test("#All should notify subscribers after a credit card payment", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);
    const shipment = new Shipment();
    const marketing = new Marketing();

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);

    const data = { userName: "Matheus Cardoso", id: Date.now() };
    subject.subscribe(shipment);
    subject.subscribe(marketing);
    payment.creditCard(data);
    expect(shipmentSpy).toHaveBeenCalledWith(data);
    expect(marketingSpy).toHaveBeenCalledWith(data);
  });
});
