import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render, renderPosition } from '../utils/render';
import { FilmCardComponent } from '../components/film-card';
import { FilmDetailsComponent } from '../components/film-details';
import { CommentComponent } from '../components/comment';

const SHOWING_FILMS_COUNT_ON_START = 5;

const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);
  const commentComponents = film.comments.map((comment) => new CommentComponent(comment));

  render(container, filmCardComponent);

  const showFilmDetails = () => {
    document.body.classList.add('hide-overflow');

    render(document.body, filmDetailsComponent);

    commentComponents.forEach((commentComponent) => {
      render(filmDetailsComponent.getElement().querySelector('.film-details__comments-list'), commentComponent);
    });

    const closeFilmDetails = () => {
      document.body.classList.remove('hide-overflow');
      remove(filmDetailsComponent);
      commentComponents.forEach((commentComponent) => remove(commentComponent));
    };

    const closeButtonHandler = () => {
      closeFilmDetails();
    };

    filmDetailsComponent.setCloseButtonClickHandler(closeButtonHandler);
  };

  const posterClickHandler = () => {
    showFilmDetails();
  };

  const titleClickHandler = () => {
    showFilmDetails();
  };

  const commentsClickHandler = () => {
    showFilmDetails();
  };

  filmCardComponent.setPosterClickHandler(posterClickHandler);
  filmCardComponent.setTitleClickHandler(titleClickHandler);
  filmCardComponent.setCommentsClickHandler(commentsClickHandler);
};

export class PageController {
  constructor(container) {
    this._container = container;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    for (let i = 0; i < showingFilmsCount; i++) {
      renderFilm(this._container, films[i]);
    }

    render(this._container, this._showMoreButtonComponent, renderPosition.AFTER);

    const showMoreFilms = () => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
      films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
        renderFilm(this._container, film);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const showMoreButtonClickHandler = () => {
      showMoreFilms();
    };

    this._showMoreButtonComponent.setClickHandler(showMoreButtonClickHandler);
  }
}
