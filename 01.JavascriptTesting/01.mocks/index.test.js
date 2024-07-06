const { rejects, deepStrictEqual } = require("assert");
const { error } = require("./src/constants");
const File = require("./src/file");

(async () => {
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeitems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Matheus Cardoso",
        id: 123,
        profession: "Software Engineer",
        birthDay: 1995,
      },
      {
        name: "John Doe",
        id: 321,
        profession: "Software Engineer",
        birthDay: 1993,
      },
      {
        name: "Maria Silva",
        id: 541,
        profession: "Software Engineer",
        birthDay: 1998,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
