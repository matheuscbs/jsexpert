# Apostila de JavaScript: Testes de Cobertura e E2E

## Introdução aos Testes de Cobertura e E2E

Este módulo do projeto `javascript_expert` é dedicado a explorar conceitos avançados de testes de cobertura e testes end-to-end (E2E). Estes são essenciais para assegurar a qualidade e robustez de aplicações web e APIs.

## O Que São Testes de Cobertura?

Testes de cobertura são usados para medir a porcentagem do código fonte que é executada durante os testes. A meta é garantir que todas as partes importantes do código sejam testadas, minimizando a chance de bugs.

### Configuração do NYC para Cobertura

A configuração abaixo garante que 100% das linhas, funções, declarações e ramificações sejam cobertas pelos testes:

```json
{
  "branches": 100,
  "functions": 100,
  "lines": 100,
  "statements": 100,
  "check-coverage": true,
  "reporter": ["text", "html"]
}
```

## O Que São Testes End-to-End (E2E)?

## Estrutura de Diretório e Arquivos Importantes

Este módulo inclui uma API simples com rotas básicas e testes associados para demonstrar como configurar e executar testes de cobertura e E2E.

- **api.js:** Define a API com rotas como `/login` e `/contact`, utilizando o módulo `http` do Node.js.
- **api.test.js:** Contém os testes E2E utilizando o framework `mocha` e a biblioteca `supertest `para simular requisições HTTP.

## Exemplo Prático de Teste E2E

O código a seguir demonstra como testes E2E são aplicados usando `supertest` para simular requisições HTTP e verificar respostas:

```js
const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });
  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", () => {
      request(app)
        .get("/hi")
        .expect(200)
        .then((response) => {
          assert.deepStrictEqual(response.text, "Hello World");
        });
    });
  });
  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Matheus", password: "123" })
        .expect(200);
      assert.deepStrictEqual(response.text, "Logging has succeeded!");
    });
    it("should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Matheus", password: "321" })
        .expect(401);
      assert.deepStrictEqual(response.text, "Logging failed!");
    });
  });
});
```

## Conclusão

Este módulo oferece uma base sólida para entender e implementar testes de cobertura e E2E em JavaScript. Esses testes são cruciais para o desenvolvimento de aplicações web e APIs robustas e confiáveis, assegurando que todos os aspectos do software funcionem corretamente sob variadas condições.
