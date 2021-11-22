import { AbstractComponent } from './abstract-component';

const MAX_LENGTH_OF_DESCRIPTION = 140;

const switchClass = (evt) => {
  if (evt.target.classList.contains('film-card__controls-item--active')) {
    evt.target.classList.remove('film-card__controls-item--active');
  } else {
    evt.target.classList.add('film-card__controls-item--active');
  }
};

const createFilmCardTemplate = (film) => {
  const { title, rating, date, duration, genre, srcPoster, description, countComments, isWatchlist, isWatched, isFavorite } = film;

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
        <button class="film-card__controls-item ${
          isWatchlist ? 'film-card__controls-item--active' : ''
        } button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item ${isWatched ? 'film-card__controls-item--active' : ''} button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item ${isFavorite ? 'film-card__controls-item--active' : ''} button film-card__controls-item--favorite">Mark as favorite</button>
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

  setButtonWatchlistClickHandler(handler) {
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        switchClass(evt);
        handler();
      });
  }

  setButtonWatchedClickHandler(handler) {
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        switchClass(evt);
        handler();
      });
  }

  setButtonFavoriteClickHandler(handler) {
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        switchClass(evt);
        handler();
      });
  }
}
