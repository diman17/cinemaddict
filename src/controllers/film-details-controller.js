import { CommentComponent } from '../components/comment-component';
import { FilmDetailsComponent } from '../components/film-details-component';
import { remove, render } from '../utils/render';

export class FilmDetailsController {
  constructor(container, film, onFilmChange) {
    this._container = container;
    this.film = film;
    this._onFilmChange = onFilmChange;

    this.isShowing = false;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleButtonWatchlistClick = this._handleButtonWatchlistClick.bind(this);
    this._handleButtonWatchedClick = this._handleButtonWatchedClick.bind(this);
    this._handleButtonFavoriteClick = this._handleButtonFavoriteClick.bind(this);
  }

  render() {
    document.body.classList.add('hide-overflow');

    this._filmDetailsComponent = new FilmDetailsComponent(this.film);

    render(document.body, this._filmDetailsComponent);

    this.isShowing = true;

    this._renderComments();

    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    this._filmDetailsComponent.setButtonWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._filmDetailsComponent.setButtonWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmDetailsComponent.setButtonFavoriteClickHandler(this._handleButtonFavoriteClick);
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  remove() {
    document.body.classList.remove('hide-overflow');

    remove(this._filmDetailsComponent);

    this.isShowing = false;

    this._removeComments();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this.remove();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
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

  _handleCloseButtonClick() {
    this.remove();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }
}
