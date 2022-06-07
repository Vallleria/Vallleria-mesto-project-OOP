// подключение к карточккам сервера
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '837c0be1-5609-4c04-b384-491cd26df7eb',
    'Content-Type': 'application/json'
  }
}


const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

// класс
export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  // получаем карточки с сервера
  getCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(checkResponse)
  }

  // получаем профиль с сервера
  getName() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(checkResponse)
  }

  // меняем имя профиля на  сервере
  editName(newName) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newName)
    })
      .then(checkResponse)
  }

  // добавляем на сервер карточку
  addCard(newCardSer) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardSer.name,
        link: newCardSer.link
      })
    })
      .then(checkResponse)
  }
  // улаляем карточку с сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(checkResponse);
  }



  // записываем лайк на сервер
  editLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(checkResponse)
  }



  // удаляем лайк с сервера
  delLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(checkResponse)
  }


  // меняем аватарку
  editAva(newURI) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newURI)
    })
      .then(checkResponse)
  }

}
const api = new Api(config);
export {
  api
}



