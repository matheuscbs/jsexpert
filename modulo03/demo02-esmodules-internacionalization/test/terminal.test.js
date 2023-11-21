import { expect } from "chai";
import sinon from "sinon";
import TerminalController from "../src/terminalController.js";
import * as readlineWrapper from "../src/readlineWrapper.js";
import Draftlog from "draftlog";

describe("TerminalController", () => {
  let terminalController;
  let createInterfaceStub, draftLogListenerMock, consoleDraftMock;

  beforeEach(() => {
    createInterfaceStub = sinon
      .stub(readlineWrapper, "createInterface")
      .returns({
        question: sinon.stub().yields(null),
        close: sinon.stub(),
      });
    draftLogListenerMock = { addLineListener: sinon.stub() };
    consoleDraftMock = sinon.stub().returns(() => {});

    terminalController = new TerminalController(
      createInterfaceStub,
      draftLogListenerMock,
      consoleDraftMock
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should initialize terminal correctly", () => {
    terminalController.initializeTerminal([], "en-US");
    expect(readlineStub.calledOnce).to.be.true;
    expect(draftlogStub.calledOnce).to.be.true;
    expect(consoleDraftStub.calledOnce).to.be.true;
  });

  it("should initialize table correctly", () => {
    const mockDatabase = [
      {
        id: 1,
        vehicles: ["Car"],
        kmTraveled: 1000,
        from: "2020-01-01",
        to: "2020-01-10",
      },
    ];
    terminalController.initializeTable(mockDatabase, "en-US");
    expect(consoleDraftStub.calledOnce).to.be.true;
  });

  it("should handle question correctly", async () => {
    const fakeQuestion = "fake question?";
    const fakeAnswer = "fake answer";
    readlineStub().question.callsFake((question, callback) => {
      expect(question).to.equal(fakeQuestion);
      callback(fakeAnswer);
    });

    const answer = await terminalController.question(fakeQuestion);
    expect(answer).to.equal(fakeAnswer);
  });

  it("should update table correctly", () => {
    terminalController.initializeTable([], "en-US");
    consoleDraftStub.resetHistory();

    const newItem = { id: 2, name: "new test" };
    terminalController.updateTable(newItem);

    expect(consoleDraftStub.calledOnce).to.be.true;
  });

  it("should close terminal correctly", () => {
    terminalController.initializeTerminal([], "en-US");
    terminalController.closeTerminal();
    expect(readlineStub().close.calledOnce).to.be.true;
  });
});
