
export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.handleOver = this.handleOver.bind(this);

    this.closeButton = this._popup.querySelector('.popup__close-icon');
    this.setCloseEventListeners();
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this.handleOver);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this.handleOver);
  }

  setCloseEventListeners() {
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
  }

  // клик по overlay
  handleOver(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.closePopup(evt.target);
    }
  }

  //клик по esc
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      const openedPopup = document.querySelector(".popup_opened")
      if (openedPopup) {
        this.closePopup(openedPopup);
      }
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
    })
  }

}


