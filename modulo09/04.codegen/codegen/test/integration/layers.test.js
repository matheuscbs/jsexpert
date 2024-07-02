import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import fsPromises from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { createLayersIfNotExists } from "../../src/createLayers.js";

async function getFolders({ mainPath, defaultMainFolder }) {
  return await fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe("#Integration - Layers - Folders Structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: ["service", "repository", "factory"].sort(),
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
    await fsPromises.mkdir(join(config.mainPath, config.defaultMainFolder));
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  test("should not create folders if it exists", async () => {
    const beforeRun = await fsPromises.readdir(
      join(config.mainPath, config.defaultMainFolder)
    );

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun.length).toBe(0);
    expect(afterRun).toStrictEqual(config.layers);
  });

  test("should create folders if it doesnt exists", async () => {
    const beforeRun = await getFolders(config);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);
    expect(afterRun).toEqual(beforeRun);
  });
});
