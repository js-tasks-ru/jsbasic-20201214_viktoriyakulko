/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
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
 *      },
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this._titles = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
    this._rows = rows;
    this.elem = this._render();
  }

  _render() {
    const table = document.createElement('table');
    const template = tableTemplate({
      titles: this._titles,
      rows: this._rows
    });

    table.innerHTML = template;
    table.addEventListener('click', this._onTableClick);

    return table;
  }

  _onTableClick(e) {
    const target = e.target;

    if (target.dataset.component != 'button-remove') return;
    target.closest('tr').remove();
  }
}

function tableTemplate({ titles = [], rows = '' } = {}) {
  return `
    <thead>
      <tr>
        ${titles.map(title => `<th>${title}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${rows.map(row => tableRowTemplate({ cells: row })).join('')}
    </tbody>
  `;
}

function tableRowTemplate({ cells = {}} = {}) {
  return `
    <tr>
      ${Object.values(cells).map(cell => `<td>${cell}</td>`).join('')}
      <td>
        <button data-component="button-remove">X</button>
      </td>
    </tr>
  `;
}
