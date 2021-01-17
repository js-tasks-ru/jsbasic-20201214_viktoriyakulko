import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;

    this._container = null;

    this._render();
  }

  get _segments() {
    return this._steps - 1;
  }

  get _valuePercents() {
    return this._value * 100 / this._segments;
  }

  get elem() {
    return this._container;
  }

  _render() {
    const template = sliderTemplate({
      steps: this._steps,
      value: this._value,
      valuePercents: this._valuePercents
    });

    this._container = createElement(template);
    this._changeSlider(this._container);
  }

  _changeSlider() {
    const thumb = this._container.querySelector('.slider__thumb');
    const value = this._container.querySelector('.slider__value');
    const progress = this._container.querySelector('.slider__progress');
    const steps = [...this._container.querySelector('.slider__steps').children];

    this._container.addEventListener('click', (e) => {
      const left = e.clientX - this._container.getBoundingClientRect().left;

      steps[this._value].classList.remove('slider__step-active');

      this._value = Math.round(left / this._container.offsetWidth * this._segments);

      steps[this._value].classList.add('slider__step-active');
      value.textContent = this._value;
      thumb.style.left = this._valuePercents + '%';
      progress.style.width = this._valuePercents + '%';
      
      this._createSliderChangeEvent(e);
    });
  }

  _createSliderChangeEvent(e) {
    const event = new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true
    });

    this._container.dispatchEvent(event);
  }
}

function sliderTemplate({steps = 0, value = 0, valuePercents = 0} = {}) {
  let stepsTemplate = '';

  for (let i = 0; i < steps; i++) {
    stepsTemplate += `<span class="${ value == i ? 'slider__step-active' : '' }"></span>`;
  }

  return `
    <div class="slider">
      <div class="slider__thumb" style="left: ${ valuePercents }%;">
        <span class="slider__value">${ value }</span>
      </div>

      <div class="slider__progress" style="width: ${ valuePercents }%;"></div>

      <div class="slider__steps">
        ${ stepsTemplate }
      </div>
    </div>
  `;
}
