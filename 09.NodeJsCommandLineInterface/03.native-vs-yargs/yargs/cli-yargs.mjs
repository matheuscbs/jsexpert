#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });
const { argv } = yargs(hideBin(process.argv))
  .command("createHero", "create a hero", (builder) => {
    return builder
      .option("name", {
        alias: "n",
        describe: "Hero's name",
        demandOption: true,
        type: "string",
      })
      .option("age", {
        alias: "a",
        describe: "Hero's age",
        demandOption: true,
        type: "number",
      })
      .option("power", {
        alias: "p",
        describe: "Hero's power",
        demandOption: true,
        type: "string",
      })
      .example(
        "createHero --name 'Superman' --age 30 --power 'Super strength'",
        "Create a hero"
      )
      .example("createHero -n 'Batman' -a 35 -p 'Rich'", "Create a hero");
  })
  .epilog("copyright 2024 - MatheusCardoso <matheuscardoso>");

console.log(hero(argv));
