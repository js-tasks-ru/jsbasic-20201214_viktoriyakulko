/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  [...table.rows].forEach((row, index) => [...row.cells][index].style.background = 'red');
}
