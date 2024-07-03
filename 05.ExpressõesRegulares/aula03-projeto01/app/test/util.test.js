const { describe, it } = require("mocha");
const { expect } = require("chai");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util", () => {
  it("#evaluateRegex should throw an error using an usafe regex", () => {
    const unsafeRegex = /ˆ([a-z]|A-Z|0-9]+\s?)+$/;
    /*
    // fica rodando em loop e quebra tudo
    catastrophic-backtracking!
    time \
    node --eval "/ˆ([a-z]|A-Z|0-9]+\s?)+$/".test('éaaaaae man como vai voce e como vai?') && console.log('massa, legalzin')"
    */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is not a valid regex expression.`
    );
  });

  it("#evaluateRegex should not throw an error using a safe regex", () => {
    const validRegex = /^([a-z])$/;
    expect(() => evaluateRegex(validRegex)).to.not.throw();
    expect(evaluateRegex(validRegex)).to.be.ok;
  });
});
