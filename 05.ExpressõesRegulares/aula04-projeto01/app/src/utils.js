const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`This ${exp} is not a valid regex expression.`);
    this.name = "InvalidRegexError";
  }
}

const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);
  if (isSafe) return exp;

  throw new InvalidRegexError(exp);
};

module.exports = { evaluateRegex, InvalidRegexError };
