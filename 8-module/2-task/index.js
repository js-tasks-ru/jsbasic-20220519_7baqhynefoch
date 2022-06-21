import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.renderGrid();
  }

  renderGrid() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `);

    this.renderCards();
  }

  renderCards() {
    let gridInner = this.elem.querySelector(".products-grid__inner");

    for (let product of this.products) {
      let productCard = new ProductCard(product);
      gridInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let filteredProducts = this.products;

    if (this.filters.noNuts) {
      filteredProducts = filteredProducts.filter(
        (product) => product.nuts === undefined || product.nuts === false
      );
    }

    if (this.filters.vegeterianOnly) {
      filteredProducts = filteredProducts.filter(
        (product) => product.vegeterian === true
      );
    }

    if (this.filters.maxSpiciness) {
      filteredProducts = filteredProducts.filter(
        (product) => product.spiciness <= this.filters.maxSpiciness
      );
    }

    if (this.filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === this.filters.category
      );
    }

    let gridInner = this.elem.querySelector(".products-grid__inner");
    gridInner.innerHTML = "";

    for (let product of filteredProducts) {
      let productCard = new ProductCard(product);
      gridInner.append(productCard.elem);
    }
  }
}
