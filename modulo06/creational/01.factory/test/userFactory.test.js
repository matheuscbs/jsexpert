const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

// poderia estar em outro arquivo
const dbData = [{ name: "John" }, { name: "Doe" }];
class MockDatabase {
  connect = async () => this;
  find = async (query) => dbData;
}

rewiremock(() => require("../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "JOHN" }, { name: "DOE" }];
    rewiremock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const userfactory = await UserFactory.createInstance();
    const result = await userfactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [{ name: "JOHN DOE" }];
    const UserFactory = require("../src/factory/userFactory");
    const userfactory = await UserFactory.createInstance();
    const result = await userfactory.find();
    deepStrictEqual(result, expected);
  }
})();
