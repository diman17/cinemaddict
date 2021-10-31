import { MAX_LENGTH_OF_DESCRIPTION } from '../const';
import { AbstractComponent } from './abstract-component';

const createFilmCardTemplate = (film) => {
  const { title, rating, date, duration, genre, srcPoster, description, comments } = film;

  const year = date.getFullYear();

  const getShortDescription = (description) => {
    if (description.length > MAX_LENGTH_OF_DESCRIPTION) {
      description = description.split('').slice(0, MAX_LENGTH_OF_DESCRIPTION).join('');
      return description.replace(/.$/, '...');
    } else {
      return description;
    }
  };

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${srcPoster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
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
