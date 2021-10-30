import { createElement } from '../utils';
import { MAX_LENGTH_OF_DESCRIPTION } from '../const';

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

export class FilmCardComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
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
