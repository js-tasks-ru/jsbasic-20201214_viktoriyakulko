function initCarousel() {
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let currentPosition = 0;

  toggleButtonsVisible();

  arrowLeft.addEventListener('click', () => {
    currentPosition += slideWidth;
    manageSlider();
  });

  arrowRight.addEventListener('click', () => {
    currentPosition -= slideWidth;
    manageSlider();
  });

  function manageSlider() {
    moveSlider();
    toggleButtonsVisible();
  }

  function toggleButtonsVisible() {
    const slidesAmount = document.querySelectorAll('.carousel__slide').length;
    const sliderVisibleLength = slideWidth * (slidesAmount - 1);

    currentPosition >= 0  ? hideElem(arrowLeft) : showElem(arrowLeft);
    currentPosition <= -sliderVisibleLength ? hideElem(arrowRight) : showElem(arrowRight);
  }

  function moveSlider() {
    document.querySelector('.carousel__inner').style.transform = `translateX(${currentPosition}px)`;
  }
}

function hideElem(elem) {
  elem.style.display = 'none';
}

function showElem(elem) {
  elem.style.display = 'block';
}
