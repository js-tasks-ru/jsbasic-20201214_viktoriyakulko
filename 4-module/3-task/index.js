/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  const titles = table.querySelectorAll('thead tr td');
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const cells = row.cells;

    if (!cells[getColumnNumber(titles, 'Status')].hasAttribute('data-available')) {
      row.setAttribute('hidden', true);
    }

    if (cells[getColumnNumber(titles, 'Status')].dataset.available === 'true') {
      row.classList.add('available');
    } else {
      row.classList.add('unavailable');
    }

    if (cells[getColumnNumber(titles, 'Gender')].textContent === 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }

    if (cells[getColumnNumber(titles, 'Age')].textContent < 18) {
      row.style.textDecoration = 'line-through';
    }
  });
}

function getColumnNumber(arr, title) {
  let number;

  arr.forEach((item, index) => {
    if (item.textContent === title) number = index;
  });

  return number;
}
