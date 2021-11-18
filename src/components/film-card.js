import { AbstractComponent } from './abstract-component';

const MAX_LENGTH_OF_DESCRIPTION = 140;

const controls = [
  {
    modifier: 'add-to-watchlist',
    text: 'Add to watchlist',
  },
  {
    modifier: 'mark-as-watched',
    text: 'Mark as watched',
  },
  {
    modifier: 'favorite',
    text: 'Mark as favorite',
  },
];

const createButton = (modifier, text) => {
  return `<button class="film-card__controls-item button film-card__controls-item--${modifier}">${text}</button>`;
};

const createFilmCardTemplate = (film) => {
  const { title, rating, date, duration, genre, srcPoster, description, countComments } = film;

  const getShortDescription = (description) => {
    if (description.length > MAX_LENGTH_OF_DESCRIPTION) {
      description = description.split('').slice(0, MAX_LENGTH_OF_DESCRIPTION).join('');
      return description.replace(/.$/, '...');
    }

    return description;
  };

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date.getFullYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${srcPoster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <a class="film-card__comments">${countComments} comments</a>
      <form class="film-card__controls">
        ${controls.map((el) => createButton(el.modifier, el.text)).join('\n')}
      </form>
    </article>`;
};

export class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector('.film-card__poster').addEventListener('click', handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector('.film-card__title').addEventListener('click', handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector('.film-card__comments').addEventListener('click', handler);
  }
}
