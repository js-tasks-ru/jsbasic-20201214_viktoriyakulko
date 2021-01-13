import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this._render();
  }

  _render() {
    const carousel = document.createElement('div');
    const template = carouselTemplate({ slides: this.slides });

    carousel.classList.add('carousel');
    carousel.innerHTML = template;

    return carousel;
  }
}

function carouselTemplate({ slides = []} = {}) {
  return `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
      ${slides
        .map(slide => slideTemplate({
            id: slide.id,
            image: slide.image,
            price: slide.price,
            name: slide.name
          })
        )
        .join('')
      }
    </div>
  `;
}

function slideTemplate({ id = '', image = '', price = '', name = '' } = {}) {
  return `
    <div class="carousel__slide" data-id="${id}">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${price.toFixed(2)}</span>
        <div class="carousel__title">${name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `;
}