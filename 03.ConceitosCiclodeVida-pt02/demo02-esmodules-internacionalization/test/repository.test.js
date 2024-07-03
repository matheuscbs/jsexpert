// test/repository.test.js
import { expect } from "chai";
import sinon from "sinon";
import { makeSaveFunction } from "../src/repository.js";

describe("save function", () => {
  let readFileStub, writeFileStub, save;
  const fakeData = { id: 1, name: "test" };
  const fakeFileContent = JSON.stringify([fakeData]);

  beforeEach(() => {
    readFileStub = sinon.stub().resolves(fakeFileContent);
    writeFileStub = sinon.stub().resolves(undefined);
    save = makeSaveFunction({
      readFile: readFileStub,
      writeFile: writeFileStub,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should read the current data from file", async () => {
    await save(fakeData);
    expect(readFileStub.calledOnce).to.be.true;
  });

  it("should write the new data to file", async () => {
    const newData = { id: 2, name: "new test" };
    await save(newData);
    const expectedFileContent = JSON.stringify([fakeData, newData]);
    expect(writeFileStub.calledWith(sinon.match.any, expectedFileContent)).to.be
      .true;
  });

  it("should return the new data id", async () => {
    const result = await save(fakeData);
    expect(result).to.equal(fakeData.id);
  });
});
