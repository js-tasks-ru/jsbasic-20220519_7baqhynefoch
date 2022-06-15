/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.createTable();
  }

  createTable() {
    this.elem = document.createElement("table");

    let thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    `;
    this.elem.append(thead);

    let tbody = document.createElement("tbody");
    tbody.innerHTML = this.rows
      .map(
        (item) => `
			<tr>
				<td>${item.name}</td>
				<td>${item.age}</td>
				<td>${item.salary}</td>
				<td>${item.city}</td>
				<td><button>X</button></td>
			</tr>`
      )
      .join("");
    this.elem.append(tbody);

    let buttons = this.elem.querySelectorAll("button");
    for (let btn of buttons) {
      btn.addEventListener("click", (event) => {
        event.target.closest("tr").remove();
      });
    }
  }
}
