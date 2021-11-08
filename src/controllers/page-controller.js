import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render } from '../utils/render';
import { FilmCardComponent } from '../components/film-card';
import { FilmDetailsComponent } from '../components/film-details';
import { CommentComponent } from '../components/comment';
import { cloneDeep } from 'lodash';

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
  constructor(container, extraFilmsList) {
    this._container = container;
    this._extraFilmsList = extraFilmsList;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    for (let i = 0; i < showingFilmsCount; i++) {
      renderFilm(this._container.querySelector('.films-list__container'), films[i]);
    }

    render(this._container.querySelector('.films-list'), this._showMoreButtonComponent);

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

    const FILMS_COUNT_IN_FILMS_LIST_EXTRA = 2;

    for (let i = 0; i < this._extraFilmsList.length; i++) {
      const filmsListExtraElements = this._container.querySelectorAll('.films-list--extra');

      const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

      const sortFilms = cloneDeep(films);
      sortFilms.sort((a, b) => b[this._extraFilmsList[i].sort] - a[this._extraFilmsList[i].sort]);

      for (let j = 0; j < FILMS_COUNT_IN_FILMS_LIST_EXTRA; j++) {
        renderFilm(filmsListExtraContainer, sortFilms[j]);
      }
    }
  }
}
