import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.renderRibbon();
    this.scrollRibbon();
    this.chooseCategory();
  }

  renderRibbon() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.ribbonInner = this.elem.querySelector(".ribbon__inner");

    this.categories.map((category) => {
      this.ribbonInner.innerHTML += `
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `;
    });
  }

  scrollRibbon() {
    const buttonLeft = this.elem.querySelector(".ribbon__arrow_left");
    const buttonRight = this.elem.querySelector(".ribbon__arrow_right");

    buttonLeft.addEventListener("click", () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    buttonRight.addEventListener("click", () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonInner.addEventListener("scroll", () => {
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollWidth = this.ribbonInner.scrollWidth;
      let clientWidth = this.ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        buttonLeft.classList.remove("ribbon__arrow_visible");
      } else {
        buttonLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        buttonRight.classList.remove("ribbon__arrow_visible");
      } else {
        buttonRight.classList.add("ribbon__arrow_visible");
      }
    });
  }

  chooseCategory() {
    this.ribbonInner.addEventListener("click", (event) => {
      event.preventDefault();

      let currentCategory = this.elem.querySelector(".ribbon__item_active");

      if (currentCategory) {
        currentCategory.classList.remove("ribbon__item_active");
      }

      event.target.classList.add("ribbon__item_active");

      event.target.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: event.target.dataset.id,
          bubbles: true,
        })
      );
    });
  }
}
