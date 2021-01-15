import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._title = null;
    this._body = null;
  }

  setTitle(title) {
    this._title = title;
  }

  setBody(body) {
    this._body = body;
  }

  open() {
    const template = modalTemplate({ title: this._title });

    document.body.classList.add('is-modal-open');
    document.body.insertAdjacentHTML('beforeend', template);

    const modalBody = document.querySelector('.modal__body');
    const buttonClose = document.querySelector('.modal__close');

    modalBody.innerHTML = '';
    modalBody.append(this._body);

    buttonClose.addEventListener('click', this.close);
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') this.close();
    });
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.body.removeChild(document.body.lastElementChild);
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

        <div class="modal__body"></div>
      </div>
    </div>
  `;
}
