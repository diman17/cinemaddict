import { createElement } from '../utils';

const createCommentsListTemplate = () => {
  return `<ul class="film-details__comments-list"></ul>`;
};

export class CommentsListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentsListTemplate();
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
