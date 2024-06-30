// curl "localhost:3000?salary=3000&discount=20"
import http from "http";

function netSalary({ discount, salary }) {
  const percent = discount / 100;
  const cost = salary * percent;
  const result = salary - cost;
  return result;
}

http
  .createServer((req, res) => {
    const url = req.url.replace("/", "");
    const params = new URLSearchParams(url);
    const data = Object.fromEntries(params);
    const result = netSalary(data);
    res.end(`O seu salario final é R$ ${result}`);
  })
  .listen(3000, () => console.log("Server is running on port 3000"));
