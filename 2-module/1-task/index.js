/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  // ваш код...
  let sum = 0;

  for (let key in salaries) {
    const salary = salaries[key];

    if (typeof salary === 'number' && isFinite(salary)) {
      sum += salary;
    }
  }

  return sum;
}
