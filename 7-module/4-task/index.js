import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;

    this.renderSlider();
    this.addEventListeners();
    this.setValue(value);
  }

  renderSlider() {
    let sliderSteps = [];
    for (let i = 0; i < this.steps; i++) {
      sliderSteps.push(
        `<span ${i === this.value ? 'class="slider__step-active"' : ""}></span>`
      );
    }

    this.elem = createElement(`
      <div class="slider">
      
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
      
        <div class="slider__progress"></div>
      
        <div class="slider__steps">
          ${sliderSteps.join("\n")}
        </div>
      </div>
    `);
  }

  setValue(value) {
    this.value = value;

    let leftPercents = (this.value / this.segments) * 100;
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    sliderValue.innerHTML = value;

    let stepActive = this.elem.querySelector(".slider__step-active");

    if (stepActive) {
      stepActive.classList.remove("slider__step-active");
    }

    this.elem
      .querySelector(".slider__steps")
      .children[this.value].classList.add("slider__step-active");
  }

  addEventListeners() {
    this.elem.onclick = this.onClick;

    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
    thumb.onpointerdown = this.onPointerDown;
  }

  onClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    this.setValue(Math.round(this.segments * leftRelative));

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };

  onPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPointerUp);
  };

  onPointerMove = (event) => {
    event.preventDefault();

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.value = Math.round(this.segments * leftRelative);
    sliderValue.innerHTML = this.value;

    let stepActive = this.elem.querySelector(".slider__step-active");

    if (stepActive) {
      stepActive.classList.remove("slider__step-active");
    }

    this.elem
      .querySelector(".slider__steps")
      .children[this.value].classList.add("slider__step-active");
  };

  onPointerUp = () => {
    this.elem.classList.remove("slider_dragging");

    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");

    thumb.style.left = `${(this.value / this.segments) * 100}%`;
    progress.style.width = `${(this.value / this.segments) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };
}
