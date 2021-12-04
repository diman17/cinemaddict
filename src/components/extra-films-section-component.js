import { AbstractComponent } from './abstract-component';

export const EXTRA_FILMS = [
  {
    name: 'Top rated',
    sort: 'rating',
  },
  {
    name: 'Most commented',
    sort: 'countComments',
  },
];

export const FILMS_COUNT_IN_FILMS_LIST_EXTRA = 2;

const createExtraFilmsSectionTemplate = (extraFilms) => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${extraFilms}</h2>
  <div class="films-list__container"></div>
</section>`;
};

export class ExtraFilmsSectionComponent extends AbstractComponent {
  constructor(extraFilms) {
    super();

    this._extraFilms = extraFilms;
  }

  getTemplate() {
    return createExtraFilmsSectionTemplate(this._extraFilms.name);
  }
}
