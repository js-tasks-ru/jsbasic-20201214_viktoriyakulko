function toggleText() {
  // ваш код...
  const toggleTextButton = document.querySelector('.toggle-text-button');
 
  toggleTextButton.addEventListener('click', () => text.hidden = !text.hidden);
}
