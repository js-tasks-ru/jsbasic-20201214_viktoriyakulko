import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._title = null;
    this._body = null;
    this._container = null;
    this._buttonClose = null;
  }

  setTitle(title) {
    this._title = title;
  }

  setBody(body) {
    this._body = createElement(`<div class="modal__body"></div>`);
    this._body.append(body);
  };

  _render(parent) {
    const template = modalTemplate({ title: this._title });

    this._container = createElement(template);
    parent.classList.add('is-modal-open');
    parent.append(this._container);

    this._buttonClose = document.querySelector('.modal__close');

    this._container.querySelector('.modal__inner').append(this._body);

    this._addEventListeners();
  }

  _addEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => this._keyDownEscape(e));
  }

  _keyDownEscape(e) {
    if (e.code == 'Escape') this.close();
  }

  open() {
    this._render(document.body);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this._container.remove();
    document.removeEventListener('keydown', (e) => this._keyDownEscape(e));
  }
}

function modalTemplate({ title = ''} = {}) {
  return `
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">${ title }</h3>
        </div>
      </div>
    </div>
  `;
}
