import { FilmCardComponent } from '../components/film-card-component';
import { render } from '../utils/render';
import { FilmDetailsController } from './film-details-controller';

export class FilmController {
  constructor(container, onFilmChange, onFilmDetailsShow) {
    this._container = container;
    this._onFilmChange = onFilmChange;
    this._onFilmDetailsShow = onFilmDetailsShow;

    this.film = null;
    this._filmCardComponent = null;

    this.filmDetailsController = null;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleButtonWatchlistClick = this._handleButtonWatchlistClick.bind(this);
    this._handleButtonWatchedClick = this._handleButtonWatchedClick.bind(this);
    this._handleButtonFavoriteClick = this._handleButtonFavoriteClick.bind(this);
  }

  render(film) {
    this.film = film;
    this._filmCardComponent = new FilmCardComponent(this.film);
    this.filmDetailsController = new FilmDetailsController(document.body, this.film, this._onFilmChange);

    render(this._container, this._filmCardComponent);

    this._filmCardComponent.setPosterClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setTitleClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleFilmCardClick);

    this._filmCardComponent.setButtonWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._filmCardComponent.setButtonWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmCardComponent.setButtonFavoriteClickHandler(this._handleButtonFavoriteClick);
  }

  rerender(film) {
    this.film = film;
    this.filmDetailsController.film = film;
    this._filmCardComponent.film = film;
    this._filmCardComponent.rerender();
  }

  _handleButtonWatchlistClick() {
    this._onFilmChange(
      this.film,
      Object.assign({}, this.film, {
        isWatchlist: !this.film.isWatchlist,
      }),
    );
  }

  _handleButtonWatchedClick() {
    this._onFilmChange(
      this.film,
      Object.assign({}, this.film, {
        isWatched: !this.film.isWatched,
      }),
    );
  }

  _handleButtonFavoriteClick() {
    this._onFilmChange(
      this.film,
      Object.assign({}, this.film, {
        isFavorite: !this.film.isFavorite,
      }),
    );
  }

  _handleFilmCardClick() {
    this._onFilmDetailsShow();
    this.filmDetailsController.render();
  }
}
