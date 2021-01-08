function hideSelf() {
  // ваш код...
  const hideSelfButton = document.querySelector('.hide-self-button');

  hideSelfButton.addEventListener('click', function() {
    this.hidden = true;
  });
}
