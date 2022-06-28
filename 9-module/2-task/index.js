import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector("[data-carousel-holder]");
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.querySelector("[data-ribbon-holder]");
    ribbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let sliderHolder = document.querySelector("[data-slider-holder]");
    sliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let iconHolder = document.querySelector("[data-cart-icon-holder]");
    iconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch("products.json");
    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    let gridHolder = document.querySelector("[data-products-grid-holder]");
    gridHolder.innerHTML = "";
    gridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", ({ detail: productId }) => {
      let product = products.find((product) => product.id == productId);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener(
      "slider-change",
      ({ detail: value }) => {
        this.productsGrid.updateFilter({
          maxSpiciness: value,
        });
      }
    );

    this.ribbonMenu.elem.addEventListener(
      "ribbon-select",
      ({ detail: categoryId }) => {
        this.productsGrid.updateFilter({
          category: categoryId,
        });
      }
    );

    let nutsCheckbox = document.querySelector("#nuts-checkbox");
    nutsCheckbox.addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked,
      });
    });

    let vegeterianCheckbox = document.querySelector("#vegeterian-checkbox");
    vegeterianCheckbox.addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked,
      });
    });
  }
}
