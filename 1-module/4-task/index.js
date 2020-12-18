/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let updatedStr = str.toLowerCase();

  return updatedStr.includes('1xbet') || updatedStr.includes('xxx');
}

