/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  // ваш код...
  for (const key in obj) {
    if (key) return false;
  }

  return true;
}
