// //5 мес массовая валидация вэбинар


export class FormValidator {
  constructor(formElement, config) {
    this.config = config;
    this.formElement = formElement;
    this.submitButton = this.formElement.querySelector(this.config.submitButtonSelector);//нахожу свою кнопку сохранить
  }

  _showError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.config.inputErrorClass)
  }

  _hideError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(this.config.inputErrorClass)
  }

  checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

    if (isInputNotValid) {
      this._showError(errorElement, inputElement);
      this.toggleButtonState(false);
    } else {
      this._hideError(errorElement, inputElement);
      this.toggleButtonState(true);
    }
  }


  toggleButtonState(isActive) {
    if (isActive) {
      this.submitButton.classList.remove(this.config.inactiveButtonClass);
      this.submitButton.disabled = false;
    } else {
      this.submitButton.classList.add(this.config.inactiveButtonClass);
      this.submitButton.disabled = 'disabled';
    }
  }

  _setEventListers() {
    const inputsList = this.formElement.querySelectorAll(this.config.inputSelector);

    Array.from(inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this.formElement.checkValidity();
        this.checkInputValidity(inputElement)
        this.toggleButtonState(isFormValid)
      })
    })
  }

  enableValidation() {
    this._setEventListers();
  }

}


export const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  Array.from(forms).forEach(formElement => {
    const formValidator = new FormValidator(formElement, rest)
    formValidator.enableValidation()

  })

}


export const validationConfig = {
  formSelector: '.popup__form',//ok
  inputSelector: '.popup__input',//ok
  submitButtonSelector: '.popup__button',//ok
  inactiveButtonClass: 'popup__button__submit_inactive',//ok
  inputErrorClass: 'popup__input_type_error',
}

const { inputSelector, ...rest } = validationConfig;


