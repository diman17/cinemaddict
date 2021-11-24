import { CommentComponent } from '../components/comment';
import { FilmCardComponent } from '../components/film-card';
import { FilmDetailsComponent } from '../components/film-details';
import { remove, render } from '../utils/render';

export class FilmController {
  constructor(container, onDataChange) {
    this._container = container;

    this._onDataChange = onDataChange;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._commentComponents = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._renderFilmDetails = this._renderFilmDetails.bind(this);

    this._handleButtonWatchlistClick = this._handleButtonWatchlistClick.bind(this);
    this._handleButtonWatchedClick = this._handleButtonWatchedClick.bind(this);
    this._handleButtonFavoriteClick = this._handleButtonFavoriteClick.bind(this);
  }

  render(film) {
    this._film = film;
    this._filmCardComponent = new FilmCardComponent(this._film);

    render(this._container, this._filmCardComponent);

    this._filmCardComponent.setPosterClickHandler(this._renderFilmDetails);
    this._filmCardComponent.setTitleClickHandler(this._renderFilmDetails);
    this._filmCardComponent.setCommentsClickHandler(this._renderFilmDetails);

    this._filmCardComponent.setButtonWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._filmCardComponent.setButtonWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmCardComponent.setButtonFavoriteClickHandler(this._handleButtonFavoriteClick);
  }

  rerender(film) {
    this._film = film;
    this._filmCardComponent.film = film;
    this._filmCardComponent.rerender();
  }

  _handleButtonWatchlistClick() {
    this._onDataChange(
      this._film,
      Object.assign({}, this._film, {
        isWatchlist: !this._film.isWatchlist,
      }),
    );
  }

  _handleButtonWatchedClick() {
    this._onDataChange(
      this._film,
      Object.assign({}, this._film, {
        isWatched: !this._film.isWatched,
      }),
    );
  }

  _handleButtonFavoriteClick() {
    this._onDataChange(
      this._film,
      Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite,
      }),
    );
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this._removeFilmDetails();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _handleCloseButtonClick() {
    this._removeFilmDetails();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _removeComments() {
    this._commentComponents.forEach((commentComponent) => remove(commentComponent));
  }

  _renderComments() {
    this._commentComponents = this._film.comments.map((comment) => new CommentComponent(comment));

    this._commentComponents.forEach((commentComponent) => {
      render(this._filmDetailsComponent.getElement().querySelector('.film-details__comments-list'), commentComponent);
    });
  }

  _removeFilmDetails() {
    document.body.classList.remove('hide-overflow');

    remove(this._filmDetailsComponent);

    this._removeComments();
  }

  _renderFilmDetails() {
    document.body.classList.add('hide-overflow');

    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    render(document.body, this._filmDetailsComponent);

    this._renderComments();

    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    document.addEventListener('keydown', this._onEscKeyDown);

    this._filmDetailsComponent.setButtonWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._filmDetailsComponent.setButtonWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmDetailsComponent.setButtonFavoriteClickHandler(this._handleButtonFavoriteClick);
  }
}
