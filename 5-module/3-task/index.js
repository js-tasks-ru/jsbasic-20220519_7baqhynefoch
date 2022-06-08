function initCarousel() {
  const btnPrev = document.querySelector(".carousel__arrow_left");
  const btnNext = document.querySelector(".carousel__arrow_right");

  const carouselInner = document.querySelector(".carousel__inner");
  const slides = carouselInner.querySelectorAll(".carousel__slide");

  let currentSlide = 0;
  const lastSlide = slides.length - 1;

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

  let width = carouselInner.offsetWidth;
  let position = 0;

  btnPrev.style.display = "none";

  btnPrev.onclick = function () {
    position = position + width;
    carouselInner.style.transform = `translateX(${position}px)`;

    currentSlide--;
    isLast(currentSlide);
    isFirst(currentSlide);
  };

  btnNext.onclick = function () {
    position = position - width;
    carouselInner.style.transform = `translateX(${position}px)`;

    currentSlide++;
    isLast(currentSlide);
    isFirst(currentSlide);
  };
}
