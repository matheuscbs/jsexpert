import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subject/paymentSubject.js";

const subject = new PaymentSubject();
const payment = new Payment(subject);
const shipment = new Shipment();
const marketing = new Marketing();

subject.subscribe(shipment);
subject.subscribe(marketing);

const data = { userName: "Matheus Cardoso", id: Date.now() };
payment.creditCard(data);

subject.unsubscribe(marketing);
payment.creditCard({ userName: "John Doe", id: Date.now() });
// Output:
// a payment occured from Matheus Cardoso
// [1634484449343]: [shipment] will pack the user's order to [Matheus Cardoso]
// [1634484449343]: [marketing] will send an email to [Matheus Cardoso]
