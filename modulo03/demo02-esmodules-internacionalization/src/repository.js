import { writeFile, readFile } from "fs/promises";

export const makeSaveFunction = (deps = { writeFile, readFile }) => {
  return async (data) => {
    const { pathname: databaseFile } = new URL(
      "./../database.json",
      import.meta.url
    );
    const currentData = JSON.parse(await deps.readFile(databaseFile));
    currentData.push(data);

    await deps.writeFile(databaseFile, JSON.stringify(currentData));

    return data.id;
  };
};

export const save = makeSaveFunction();
