import { beforeEach, describe, jest, test } from "@jest/globals";
import Util from "../../src/utils.js";

describe("#Util - Strings", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#upperCaseFirstLetter should transform the first letter in upperCase", () => {
    const data = "hello";
    const expected = "Hello";
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test("#lowerCaseFirstLetter should transform the first letter in lowerCase", () => {
    const data = "Hello";
    const expected = "hello";
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test("#lowerCaseFirstLetter given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
  test("#upperCaseFirstLetter given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
});
