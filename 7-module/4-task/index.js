import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._currentValue = value;

    this._container = null;
    this._thumb = null;
    this._thumbValue = null;
    this._stepMarks = null;
    this._progress = null;

    this._render();
  }

  get elem() {
    return this._container;
  }

  get _segments() {
    return this._steps - 1;
  }

  get _valueSegmentsPercents() {
    return this._currentValue * 100 / this._segments;
  }

  _render() {
    const template = sliderTemplate({
      steps: this._steps,
      value: this._currentValue,
      valuePercents: this._valueSegmentsPercents
    });

    this._container = createElement(template);
    this._changeSlider();
  }

  _changeSlider() {
    this._initElems();
    this._addEventListeners();
  }

  _initElems() {
    this._thumb = this._container.querySelector('.slider__thumb');
    this._thumbValue = this._container.querySelector('.slider__value');
    this._progress = this._container.querySelector('.slider__progress');
    this._stepMarks = [...this._container.querySelector('.slider__steps').children];
  }

  _addEventListeners() {
    this._container.addEventListener('click', this._onContainerClick);
    this._thumb.addEventListener('pointerdown', this._onThumbPointerDown);
    this._thumb.addEventListener('dragstart', () => false);
  }

  _onContainerClick = (e) => {
    let left = e.clientX - this._container.getBoundingClientRect().left;

    this._stepMarks[this._currentValue].classList.remove('slider__step-active');
    this._currentValue = Math.round(left / this._container.offsetWidth * this._segments);
    this._stepMarks[this._currentValue].classList.add('slider__step-active');

    this._displayChange(this._valueSegmentsPercents);
    this._createSliderChangeEvent();
  }

  _onThumbPointerDown = (e) => {
    e.preventDefault();
    this._container.classList.add('slider_dragging');
    this._stepMarks[this._currentValue].classList.remove('slider__step-active');
    document.addEventListener('pointermove', this._onDocumentPointerMove);
    document.addEventListener('pointerup', this._onDocumentPointerUp);
  }

  _onDocumentPointerMove = (e) => {
    let left = e.clientX - this._container.getBoundingClientRect().left;
    let leftPercents = Math.round(left / this._container.offsetWidth * 100);

    if (leftPercents < 0) leftPercents = 0;
    if (leftPercents > 100) leftPercents = 100;

    this._currentValue = Math.round(left / this._container.offsetWidth * this._segments);

    this._displayChange(leftPercents);
    this._createSliderChangeEvent();
  }

  _onDocumentPointerUp = () => {
    this._stepMarks[this._currentValue].classList.add('slider__step-active');
    this._displayChange(this._valueSegmentsPercents);
    this._createSliderChangeEvent();
    this._container.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this._onDocumentPointerMove);
  }

  _displayChange(percents) {
    this._thumbValue.textContent = this._currentValue;
    this._thumb.style.left = percents + '%';
    this._progress.style.width = percents + '%';
  }

  _createSliderChangeEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this._currentValue,
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
