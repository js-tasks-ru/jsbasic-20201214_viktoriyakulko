function initCarousel() {
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  const slidesAmount = document.querySelectorAll('.carousel__slide').length;
  const sliderVisibleLength = slideWidth * (slidesAmount - 1);
  let currentPosition = 0;

  toggleButtonsVisible(currentPosition);

  arrowLeft.addEventListener('click', () => {
    currentPosition += slideWidth;
    manageSlider(currentPosition);
  });

  arrowRight.addEventListener('click', () => {
    currentPosition -= slideWidth;
    manageSlider(currentPosition);
  });

  function manageSlider(currentPosition) {
    moveSlider(currentPosition);
    toggleButtonsVisible(currentPosition);
  }

  function toggleButtonsVisible(currentPosition) {
    currentPosition >= 0  ? hideElem(arrowLeft) : showElem(arrowLeft);
    currentPosition <= -sliderVisibleLength ? hideElem(arrowRight) : showElem(arrowRight);
  }

  function moveSlider(currentPosition) {
    document.querySelector('.carousel__inner').style.transform = `translateX(${currentPosition}px)`;
  }
}

function hideElem(elem) {
  elem.style.display = 'none';
}

function showElem(elem) {
  elem.style.display = 'block';
}
