import { createElement } from '../utils';

const createProfileTemplate = (profile) => {
  const { rating, srcAvatar } = profile;
  return `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="${srcAvatar}" alt="Avatar" width="35" height="35">
    </section>`;
};

export class ProfileComponent {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
