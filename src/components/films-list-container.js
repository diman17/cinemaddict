import { AbstractComponent } from './abstract-component';

const createFilmsListContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export class FilmsListContainerComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
