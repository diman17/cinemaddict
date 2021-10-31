import { createElement } from '../utils';

const createFilmsListExtraTemplate = (listExtra) => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">${listExtra}</h2>
    </section>`;
};

export class FilmsListExtraComponent {
  constructor(listExtra) {
    this._listExtra = listExtra;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._listExtra);
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
