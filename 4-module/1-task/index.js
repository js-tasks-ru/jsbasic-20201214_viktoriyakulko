/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */

function makeFriendsList(friends) {
  // ваш код...
    const ul = document.createElement('ul');
    let li = '';

    friends.forEach(friend => li += createLiTemplate(friend));
    ul.innerHTML = li;

    return ul;
}

function createLiTemplate({ firstName, lastName } = {}) {
  return `<li>${firstName} ${lastName}</li>`;
}
