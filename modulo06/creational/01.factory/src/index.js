const UserFactory = require("./factory/userFactory");

(async () => {
  try {
    const userFactory = await UserFactory.createInstance();
    console.log("Factory created:", userFactory);

    const result = await userFactory.find({ name: "John*" });
    console.log(result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
