/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  // ваш код...
  const sortedNumbersArr = str
    .split(',')
    .map(item => item.trim().split(' '))
    .flat()
    .filter(item => parseFloat(item))
    .sort((a, b) => a - b);

  return {
    min: +sortedNumbersArr[0],
    max: +sortedNumbersArr[sortedNumbersArr.length - 1]
  };
}
