import Draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import * as readlineWrapper from "./readlineWrapper.js";
import readline from "readline";
import Person from "./person.js";

export default class TerminalController {
  constructor(readlineInterface, draftLogListener, consoleDraft) {
    this.terminal = readlineInterface;
    this.draftLogListener = draftLogListener;
    this.consoleDraft = consoleDraft;
    this.data = [];
    this.print = null;
  }

  initializeTerminal(database, language) {
    this.draftlogModule(console).addLineListener(process.stdin);
    this.terminal = readlineWrapper.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);
    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.blue("KM Traveled") },
        { field: "from", name: chalk.green("From") },
        { field: "to", name: chalk.red("To") },
      ],
    };
  }
}
