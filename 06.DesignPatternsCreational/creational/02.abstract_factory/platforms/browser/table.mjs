import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareDate(data);
    document.body.insertAdjacentHTML("afterBegin", template);
  }

  prepareDate(data) {
    const [fistItem] = data;
    const tHeaders = Object.keys(fistItem).map(
      (text) => `<th scope=col>${text}</th>`
    );

    const joinLists = (list) => list.join("");
    const tBodyValues = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinLists(tds)}</tr>`);

    const template = `
      <table class="table">
        <thead>
          <tr>${joinLists(tHeaders)}</tr>
        </thead>
        <tbody>
          ${joinLists(tBodyValues)}
        </tbody>
      </table>
    `;

    return template;
  }
}
