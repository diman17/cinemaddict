import { AbstractComponent } from './abstract-component';

const createFilmsListExtraTemplate = (listExtra) => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">${listExtra}</h2>
    </section>`;
};

export class FilmsListExtraComponent extends AbstractComponent {
  constructor(listExtra) {
    super();

    this._listExtra = listExtra;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._listExtra);
  }
}
