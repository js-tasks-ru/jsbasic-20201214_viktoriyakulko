import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor({ name, price, category, image, id } = {}) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._image = image;
    this._id = id;
    this._buttonRemove = null;
    this.elem = this._render();
  }

  _render() {
    const card = document.createElement('div');
    const template = cardTemplate({
      image: this._image,
      price: this._price,
      name: this._name
    });

    card.classList.add('card');
    card.innerHTML = template;

    this._buttonRemove = card.querySelector('.card__button');
    this._buttonRemove.addEventListener('click', this._onButtonClick.bind(this));

    return card;
  }

  destroy() {
    this._buttonRemove.removeEventListener('click', this._onMenuClick);
    this.elem.remove();
  }

  _onButtonClick() {
    const event = new CustomEvent('product-add', { detail: this._id, bubbles: true });

    this.elem.dispatchEvent(event);
  }
}

function cardTemplate({ image = '', price = '', name = '' } = {}) {
  return `
    <div class="card__top">
      <img src="/assets/images/products/${image}" class="card__image" alt="product">
      <span class="card__price">€${price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  `;
}
