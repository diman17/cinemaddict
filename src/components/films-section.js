import { AbstractComponent } from './abstract-component';

const createFilmsSectionTemplate = () => {
  return `<section class="films"></section>`;
};

export class FilmsSectionComponent extends AbstractComponent {

  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
