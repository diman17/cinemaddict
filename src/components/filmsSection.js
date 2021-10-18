import { createElement } from '../utils';

const createFilmsSectionTemplate = () => {
  return `<section class="films"></section>`;
};

export class FilmsSectionComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsSectionTemplate();
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
