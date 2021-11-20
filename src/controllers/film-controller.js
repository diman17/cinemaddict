import { CommentComponent } from '../components/comment';
import { FilmCardComponent } from '../components/film-card';
import { FilmDetailsComponent } from '../components/film-details';
import { remove, render } from '../utils/render';

export class FilmController {
  constructor(container, film) {
    this._container = container;
    this._film = film;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._commentComponents = film.comments.map((comment) => new CommentComponent(comment));

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._renderFilmDetails = this._renderFilmDetails.bind(this);
  }

  render() {
    render(this._container, this._filmCardComponent);

    this._filmCardComponent.setPosterClickHandler(this._renderFilmDetails);
    this._filmCardComponent.setTitleClickHandler(this._renderFilmDetails);
    this._filmCardComponent.setCommentsClickHandler(this._renderFilmDetails);
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

  _removeFilmDetails() {
    document.body.classList.remove('hide-overflow');
    remove(this._filmDetailsComponent);
    this._commentComponents.forEach((commentComponent) => remove(commentComponent));
  }

  _renderFilmDetails() {
    document.body.classList.add('hide-overflow');

    render(document.body, this._filmDetailsComponent);

    this._commentComponents.forEach((commentComponent) => {
      render(this._filmDetailsComponent.getElement().querySelector('.film-details__comments-list'), commentComponent);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    document.addEventListener('keydown', this._onEscKeyDown);
  }
}
