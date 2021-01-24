export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let currentItem = this.cartItems.find(item => item.product.id == product.id);

    if (currentItem) {
      currentItem.count++;
    } else {
      currentItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(currentItem);
    }

    this.onProductUpdate(currentItem);
  }

  updateProductCount(productId, amount) {
    let currentItem = this.cartItems.find(item => item.product.id == productId);

    currentItem.count += amount;

    if (currentItem.count == 0) {
      this.cartItems.splice([this.cartItems.indexOf(currentItem)], 1);
    }

    this.onProductUpdate(currentItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

