

export class Card {
  constructor({ cardItem, handleCardClick, handleLikeClick, handleDeleteIconClick, handleButtonLike  }, templateSelector) {
    this.data = cardItem;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
    this.handleButtonLike = handleButtonLike;
    this._templateSelector = templateSelector;

    //константы СОЗДАНИЯ новой карточки
    //this._elementThere = document.querySelector('#element-template').content;//их версия

    this.elementCard = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    this.buttonLike = this.elementCard.querySelector('.element__like');
    this.trashElement = this.elementCard.querySelector('.element__tresh');
  }


  _activateButtonLike() {
    this.buttonLike.classList.add('element__like_active');
  }

  _deactivateButtonLike() {
    this.buttonLike.classList.remove('element__like_active');
  }

  _removeElementTrash() {
    this.trashElement.classList.add("element__tresh-nonActive");  // удалить значек мусорник
  }

  //функция СОЗДАНИЯ новой карточки
  createDOMCard() {

    //const elementCard = this._elementThere.querySelector(this._templateSelector).cloneNode(true);
    const cardImage = this.elementCard.querySelector('.element__photo');
    const countLikes = this.elementCard.querySelector('.element__count-likes');

    this.elementCard.querySelector('.element__title').textContent = this.data.name;
    countLikes.textContent = this.data.likes.length;// 5 месяц лайки
    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardImage.addEventListener('click', this.handleCardClick);
    this.buttonLike.addEventListener('click', (evt) => {
      this.handleLikeClick(this.data, countLikes, this._activateButtonLike.bind(this), this._deactivateButtonLike.bind(this));
    });

    this.handleDeleteIconClick(this.trashElement, this._removeCardFromDOM, this._removeElementTrash.bind(this));
    this.handleButtonLike(this._activateButtonLike.bind(this));

    // функция удаления по мусорнику в создании новой карточки
    return this.elementCard;
  }

  //функция удаления карточки
  _removeCardFromDOM(evt) {
    const target = evt.target;
    target.closest('.element').remove()
  }

}






