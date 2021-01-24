/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

export default async function promiseClick(button) {
  button.addEventListener('click', event => event, { once: true });
}