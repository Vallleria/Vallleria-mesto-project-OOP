
import { Popup } from './Popup'

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this.popupCardTitle = document.querySelector(".popup-photo-card__title");
    this.popupCardPhoto = document.querySelector(".popup-photo-card__photo");
  }

  // тут что-то типа эдд нью фото кард из класса кард
  openPopup(name, link) {
    this.popupCardTitle.textContent = name;
    this.popupCardPhoto.src = link;
    this.popupCardPhoto.alt = name;
    super.openPopup();
  }
}
