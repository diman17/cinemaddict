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
  }

  renderFilm() {
    render(this._container, this._filmCardComponent);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

      if (isEscKey) {
        closeFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const closeFilmDetails = () => {
      document.body.classList.remove('hide-overflow');
      remove(this._filmDetailsComponent);
      this._commentComponents.forEach((commentComponent) => remove(commentComponent));
    };

    const showFilmDetails = () => {
      document.body.classList.add('hide-overflow');

      render(document.body, this._filmDetailsComponent);

      this._commentComponents.forEach((commentComponent) => {
        render(this._filmDetailsComponent.getElement().querySelector('.film-details__comments-list'), commentComponent);
      });

      document.addEventListener('keydown', onEscKeyDown);

      this._filmDetailsComponent.setCloseButtonClickHandler(() => {
        closeFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      });
    };

    this._filmCardComponent.setPosterClickHandler(() => {
      showFilmDetails();
    });
    this._filmCardComponent.setTitleClickHandler(() => {
      showFilmDetails();
    });
    this._filmCardComponent.setCommentsClickHandler(() => {
      showFilmDetails();
    });
  }
}
