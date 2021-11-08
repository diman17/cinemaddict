import { AbstractComponent } from './abstract-component';

const createExtraFilmsSection = (extra) => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${extra}</h2>
  <div class="films-list__container"></div>
</section>`;
};

const createFilmsSectionTemplate = (extraFilmsList) => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
    ${extraFilmsList.map((extra) => createExtraFilmsSection(extra.name)).join('\n')}
  </section>`;
};

export class FilmsSectionComponent extends AbstractComponent {
  constructor() {
    super();

    this.extraFilmsList = [
      {
        name: 'Top rated',
        sort: 'rating',
      },
      {
        name: 'Most commented',
        sort: 'countComments',
      },
    ];
  }

  getTemplate() {
    return createFilmsSectionTemplate(this.extraFilmsList);
  }
}
