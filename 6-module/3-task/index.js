import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.renderCarousel();
    this.initCarousel();
    this.addToCard();
  }

  renderCarousel() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `);

    this.carouselInner = createElement(`
      <div class="carousel__inner"></div>
    `);

    this.slides.map((slide) => {
      this.carouselInner.innerHTML += `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${
            slide.image
          }" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;
      this.elem.append(this.carouselInner);
    });
  }

  initCarousel() {
    let btnPrev = this.elem.querySelector(".carousel__arrow_left");
    let btnNext = this.elem.querySelector(".carousel__arrow_right");
    let carouselInner = this.elem.querySelector(".carousel__inner");

    let currentSlide = 0;
    let lastSlide = this.slides.length - 1;

    function isFirst(currentSlide) {
      if (currentSlide === 0) {
        btnPrev.style.display = "none";
      } else {
        btnPrev.style.display = "";
      }
    }

    function isLast(currentSlide) {
      if (currentSlide === lastSlide) {
        btnNext.style.display = "none";
      } else {
        btnNext.style.display = "";
      }
    }

    let position = 0;

    btnPrev.style.display = "none";

    btnPrev.onclick = () => {
      position = position + this.carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${position}px)`;

      currentSlide--;
      isLast(currentSlide);
      isFirst(currentSlide);
    };

    btnNext.onclick = () => {
      position = position - this.carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${position}px)`;

      currentSlide++;
      isLast(currentSlide);
      isFirst(currentSlide);
    };
  }

  addToCard() {
    let btnsAddToCard = this.elem.querySelectorAll(".carousel__button");

    for (let btn of btnsAddToCard) {
      btn.addEventListener("click", () =>
        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: btn.closest("[data-id]").dataset.id,
            bubbles: true,
          })
        )
      );
    }
  }
}
