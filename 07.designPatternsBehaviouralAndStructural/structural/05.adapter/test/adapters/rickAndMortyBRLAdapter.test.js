import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL";

describe("#RickAndMortyBRLAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("#getCharacters should be an adapter for RickAndMortyBrl.getCharactersJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getChractersFromJSON.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();

    expect(result).toEqual([]);
    expect(brlIntegration).toHaveBeenCalled();
  });
});
