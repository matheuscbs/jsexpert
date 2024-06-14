import chalk from "chalk";
import chalkTable from "chalk-table";
import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareDate(data);
    const options = {
      leftPad: 2,
      columns,
    };
    const table = chalkTable(options, data);
    console.log(table);
  }

  prepareDate(data) {
    const [fistItem] = data;
    const headers = Object.keys(fistItem);

    const formatHeader = (data, index) =>
      index % 2 === 0 ? chalk.green(data) : chalk.blue(data);

    const columns = headers.map((item, index) => ({
      field: item,
      name: formatHeader(item, index),
    }));

    return columns;
  }
}
