import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.renderModal();
    this.closeModal();
  }

  renderModal() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>

          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
  `);
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
  }

  setTitle(title) {
    let modalTitle = this.modal.querySelector(".modal__title");
    modalTitle.textContent = title;
  }

  setBody(node) {
    this.modal.querySelector(".modal__body").innerHTML = "";
    this.modal.querySelector(".modal__body").append(node);
  }

  close = () => {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
  };

  closeModal() {
    let removeBtn = this.modal.querySelector(".modal__close");
    removeBtn.addEventListener("click", this.close);

    let removeOnEscape = (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    };

    document.addEventListener("keydown", removeOnEscape, { once: true });
  }
}
