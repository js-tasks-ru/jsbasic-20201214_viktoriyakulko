import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.productsGrid = null;
    this.products = null;
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    await this.showProducts();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListeners();
  }

  async getProducts() {
    const response = await fetch('products.json');
    let products = [];

    if (response.ok) {
      products = await response.json();
    } else {
      console.log('Ошибка: ' + response.status);
    }

    return products;
  }

  async showProducts() {
    this.products = await this.getProducts();
    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    
    this.productsGrid = new ProductsGrid(this.products);

    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);
  }

  addEventListeners() {
    this.onProductAdd();
    this.onSliderChange();
    this.onRibbonSelect();
    this.onCheckboxesChange();
  }

  onProductAdd() {
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      const chosenProduct = this.products.find(product => product.id == productId);

      this.cart.addProduct(chosenProduct);
    });
  }

  onSliderChange() {
    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      const value = event.detail;

      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });
  }

  onRibbonSelect() {
    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      const categoryId = event.detail;

      this.productsGrid.updateFilter({
        category: categoryId
      });
    });
  }

  onCheckboxesChange() {
    const nutsCheckbox = document.querySelector('#nuts-checkbox');
    const vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');

    nutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    vegeterianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
