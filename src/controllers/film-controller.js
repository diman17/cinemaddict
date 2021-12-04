import { CommentComponent } from '../components/comment-component';
import { FilmCardComponent } from '../components/film-card-component';
import { FilmDetailsComponent } from '../components/film-details-component';
import { remove, render } from '../utils/render';

export class FilmController {
  constructor(container, onFilmChange, onFilmDetailsShow) {
    this._container = container;

    this._onFilmChange = onFilmChange;
    this._onFilmDetailsShow = onFilmDetailsShow;

    this.isFilmDetailsShowing = false;

    this.film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._commentComponents = null;

    this._renderFilmDetails = this._renderFilmDetails.bind(this);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleButtonWatchlistClick = this._handleButtonWatchlistClick.bind(this);
    this._handleButtonWatchedClick = this._handleButtonWatchedClick.bind(this);
    this._handleButtonFavoriteClick = this._handleButtonFavoriteClick.bind(this);
  }

  render(film) {
    this.film = film;
    this._filmCardComponent = new FilmCardComponent(this.film);

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
    this._filmCardComponent.film = film;
    this._filmCardComponent.rerender();
  }

  _renderFilmDetails() {
    document.body.classList.add('hide-overflow');

    this._filmDetailsComponent = new FilmDetailsComponent(this.film);

    render(document.body, this._filmDetailsComponent);

    this.isFilmDetailsShowing = true;

    this._renderComments();

    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    document.addEventListener('keydown', this._onEscKeyDown);

    this._filmDetailsComponent.setButtonWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._filmDetailsComponent.setButtonWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmDetailsComponent.setButtonFavoriteClickHandler(this._handleButtonFavoriteClick);
  }

  removeFilmDetails() {
    document.body.classList.remove('hide-overflow');

    remove(this._filmDetailsComponent);

    this._removeComments();
  }

  _renderComments() {
    this._commentComponents = this.film.comments.map((comment) => new CommentComponent(comment));

    this._commentComponents.forEach((commentComponent) => {
      render(this._filmDetailsComponent.getElement().querySelector('.film-details__comments-list'), commentComponent);
    });
  }

  _removeComments() {
    this._commentComponents.forEach((commentComponent) => remove(commentComponent));
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

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this.removeFilmDetails();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _handleCloseButtonClick() {
    this.removeFilmDetails();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _handleFilmCardClick() {
    this._onFilmDetailsShow(this._renderFilmDetails);
  }
}
