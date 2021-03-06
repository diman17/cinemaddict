import { getFormatDuration } from '../utils/common';
import { AbstractComponent } from './abstract-component';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const createFilmDetailsTemplate = (film) => {
  const {
    title,
    age,
    rating,
    director,
    writters,
    actors,
    date,
    country,
    duration,
    genre,
    srcPoster,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const getWritters = (writtersList) => {
    if (writtersList.length === 1) {
      return writtersList[0];
    }
    return writtersList.join(', ');
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${srcPoster}" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${getWritters(writters)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${new Date(date).getDate()} ${
    MONTHS[new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getFormatDuration(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${
          isWatchlist ? 'checked' : ''
        }>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${
          isWatched ? 'checked' : ''
        }>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${
          isFavorite ? 'checked' : ''
        }>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container"></div>

  </form>
</section>`;
};

export class FilmDetailsComponent extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', handler);
  }

  setButtonWatchlistClickHandler(handler) {
    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', () => {
        handler();
      });
  }

  setButtonWatchedClickHandler(handler) {
    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', () => {
        handler();
      });
  }

  setButtonFavoriteClickHandler(handler) {
    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', () => {
        handler();
      });
  }
}
