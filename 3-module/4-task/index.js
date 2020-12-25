/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  // ваш код...
  return users
    .filter(({ age: userAge }) => userAge <= age)
    .map(({ balance, name }, index, arr) => index === arr.length - 1 ? `${name}, ${balance}` : `${name}, ${balance}\n`)
    .join('');
}
