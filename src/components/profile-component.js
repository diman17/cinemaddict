import { getFilmsByHistoryFilter } from '../utils/filter';
import { AbstractComponent } from './abstract-component';

const PROFILES = {
  NOVICE: {
    rating: 'Novice',
    srcAvatar: 'images/film_bronze.svg',
  },
  FAN: {
    rating: 'Fan',
    srcAvatar: 'images/film_silver.svg',
  },
  MOVIE_BUFF: {
    rating: 'Movie Buff',
    srcAvatar: 'images/film_gold.svg',
  },
};

const getProfile = (countWatchedFilms) => {
  if (countWatchedFilms >= 0 && countWatchedFilms <= 10) {
    return PROFILES.NOVICE;
  }
  if (countWatchedFilms >= 11 && countWatchedFilms <= 20) {
    return PROFILES.FAN;
  }
  if (countWatchedFilms >= 21) {
    return PROFILES.MOVIE_BUFF;
  }
};

const createProfileTemplate = (films) => {
  const countWatchedFilms = getFilmsByHistoryFilter(films).length;
  const profile = getProfile(countWatchedFilms);
  const { rating, srcAvatar } = profile;

  return `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="${srcAvatar}" alt="Avatar" width="50" height="50">
    </section>`;
};

export class ProfileComponent extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }
}
