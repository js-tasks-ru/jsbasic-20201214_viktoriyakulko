/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */

function makeFriendsList(friends) {
  // ваш код...
    const ul = document.createElement('ul');
    let li = '';

    friends.forEach(friend => li += `<li>${friend.firstName} ${friend.lastName}</li>`);
    ul.innerHTML = li;

    return ul;
}
