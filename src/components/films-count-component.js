import { AbstractComponent } from './abstract-component';

const createFilmsCountTemplate = (count) => {
  return `<p>${count} movies inside</p>`;
};

export class FilmsCountComponent extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._count);
  }
}
