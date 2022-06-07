
export class UserInfo {
  constructor(profileTitleSelector, profileSubtitleSelector) {
    // получить лементы из страницы title & subtitle & avatar
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent
    }
  }

  setUserInfo(userData) {
    this._profileTitle.textContent = userData.name;
    this._profileSubtitle.textContent = userData.about;
  }

}


