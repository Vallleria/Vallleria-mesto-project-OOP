import './pages/index.css';
import { PopupWithForm } from './components/PopupWithForm'
import { PopupWithImage } from './components/PopupWithImage'
import { enableValidation, FormValidator, validationConfig } from './components/FormValidator.js'
import { api } from './components/Api.js'
import { UserInfo } from './components/UserInfo.js'
import { Section } from './components/Section.js'
import { Card } from './components/Card.js'



// константы редактированиz значения в попапе
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');

const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");

// попапы
const popupProfile = new PopupWithForm('.popup_profile', (inputValues) => {
  // клик по кнопке отправке данных профиля (по кнопке Сохранить)
  popupProfile.setSubmitButtonText("Сохранить...");

  const objForPrifile = {
    name: inputValues['name'],
    about: inputValues['profession']
  }

  api.editName(objForPrifile)
    .then((userData) => {
      popupProfile.closePopup()
      userInfo.setUserInfo(userData);
    })
    .finally(() => popupProfile.setSubmitButtonText("Сохранить"))
    .catch((err) => {
      console.log(err);
    });

});

popupProfile.setEventListeners();
popupProfile.setFormValidator(new FormValidator(popupProfile.popupForm, validationConfig));

const popupAvatar = new PopupWithForm('.popup_new-avatar', (inputValues) => {
  popupAvatar.setSubmitButtonText("Сохранить...");

  const objForAva = {
    avatar: inputValues['avatar'],
  }

  api.editAva(objForAva)
    .then((data) => {
      popupAvatar.closePopup();
      profileAvatar.src = data.avatar;
    })
    .finally(() => popupAvatar.setSubmitButtonText("Сохранить"))
    .catch((err) => {
      console.log(err);
    });
});

popupAvatar.setEventListeners();
popupAvatar.setFormValidator(new FormValidator(popupAvatar.popupForm, validationConfig));

const popupWithImage = new PopupWithImage('.popup-photo-card');


const createCardHandlers = (cardItem, user) => {
  return {
    handleCardClick: () => {
      //...что должно произойти при клике на картинку
      popupWithImage.openPopup(cardItem.name, cardItem.link);
    },
    handleLikeClick: (item, countLikes, addLikeActiveCallback, removeLikeActiveCallback) => {
      // ...что должно произойти при клике на лайк

      // _toggleLike(evt, item, countLikes) {

      if (item.likes.find((like) => like._id === user._id) ? true : false) {
        api.delLike(item._id)
          .then((data) => {
            countLikes.textContent = data.likes.length; //выводит новое значения лайка
            item.likes = data.likes;
            removeLikeActiveCallback();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.editLike(item._id)
          .then((data) => {
            countLikes.textContent = data.likes.length; //выводит новое значения лайка
            item.likes = data.likes;
            addLikeActiveCallback();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteIconClick: (trashElement, removeCardFromDOMCallback, removeElementTrashCallback) => {
      // ...что должно произойти при клике на удаление
      if (cardItem.owner._id === user._id) {

        trashElement.addEventListener('click', (evt) => {
          api.deleteCard(cardItem._id)
            .then(() => {
              removeCardFromDOMCallback(evt)
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        removeElementTrashCallback(); // удалить значек мусорник
      }
    },
    handleButtonLike: (addLikeCallback) => {
      if (cardItem.likes.find((like) => like._id === user._id) ? true : false) {
        addLikeCallback();
      };
    }
  }
}





api.getName()
  .then(userData => {
    userInfo.setUserInfo(userData);
    profileAvatar.src = userData.avatar;
  })
  .catch(err => {
    console.log(err);
  });


Promise.all([api.getCard(), api.getName()]).then(([cards, user]) => {
  const section = new Section(cards, '.elements', (cardItem) => {
    const handlers = createCardHandlers(cardItem, user);


    const card = new Card({ cardItem, ...handlers }, '#element-template');
    const cardElement = card.createDOMCard();
    section.elements.prepend(cardElement);
  });

  section.render();

  const popupNewCard = new PopupWithForm('.popup_new-card', (inputValues) => {
    popupNewCard.setSubmitButtonText("Сохранение...");

    const objForCard = {
      name: inputValues['name'],
      link: inputValues['url']
    }

    api.addCard(objForCard)
      .then((newCard) => {
        const handlers = createCardHandlers(newCard, newCard.owner);
        const card = new Card({ cardItem: newCard, ...handlers }, '#element-template');
        const cardElement = card.createDOMCard();
        section.addItem(cardElement); //Добавление в DOM
        popupNewCard.closePopup();
        popupNewCard.resetValidation();
        popupNewCard.setSubmitButtonText("Сохранить");
      })
      .finally(() => popupNewCard.setSubmitButtonText("Сохранить"))
      .catch((err) => {
        console.log(err);
      });
  });

  popupNewCard.setEventListeners();
  popupNewCard.setFormValidator(new FormValidator(popupNewCard.popupForm, validationConfig));


  const newCardButton = document.querySelector('.profile__add-button');
  //открытие попапа карточки
  newCardButton.addEventListener('click', () => {
    popupNewCard.openPopup(); // поправила на класс
  });

}).catch(err => {
  console.log(err);
});


// попап редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const avatarEdit = document.querySelector('.profile__avatar-cont');// 5 месяц


//попап новой карточки

export const popupFormNewCard = document.querySelector('.popup__form_new-card');

//фото карточек
export const popBigPhotoCard = document.querySelector('.popup-photo-card');



//открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValue('#name', info.title);
  popupProfile.setInputValue('#profession', info.subtitle);
  popupProfile.openPopup();
});

//открытие попапа аватара
avatarEdit.addEventListener('click', () => {
  popupAvatar.openPopup();
});

// 5 мес массовая валидация
enableValidation(validationConfig);


