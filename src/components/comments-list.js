import { AbstractComponent } from './abstract-component';

const createCommentsListTemplate = () => {
  return `<ul class="film-details__comments-list"></ul>`;
};

export class CommentsListComponent extends AbstractComponent {
  getTemplate() {
    return createCommentsListTemplate();
  }
}
