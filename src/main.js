import { ProfileComponent } from './components/profile';
import { SiteNavigationComponent } from './components/site-navigation';
import { SortComponent } from './components/sort';
import { FilmsSectionComponent } from './components/films-section';
import { FilmsListComponent } from './components/films-list';
import { FilmsListContainerComponent } from './components/films-list-container';
import { ShowMoreButtonComponent } from './components/show-more-button';
import { FilmsListExtraComponent } from './components/films-list-extra';
import { SiteStatisticsComponent } from './components/site-statistics';
import { generateFilms } from './mock/film';
import { generateProfile } from './mock/profile';
import {
  EXTRA_LIST_FILMS,
  FILMS_COUNT_IN_FILMS_LIST_EXTRA,
  SHOWING_FILMS_COUNT_BY_BUTTON,
  SHOWING_FILMS_COUNT_ON_START,
  TOTAL_FILMS,
} from './const';
import { remove, render, renderPosition } from './utils/render';
import { FilmCardComponent } from './components/film-card';
import { FilmDetailsComponent } from './components/film-details';
import { CommentsListComponent } from './components/comments-list';
import { CommentComponent } from './components/comment';
import { cloneDeep } from 'lodash';

const siteHeaderElement = document.querySelector('.header');

const profile = generateProfile();

render(siteHeaderElement, new ProfileComponent(profile));

const siteMainElement = document.querySelector('.main');

render(siteMainElement, new SiteNavigationComponent());

render(siteMainElement, new SortComponent());

const filmsSectionComponent = new FilmsSectionComponent();

render(siteMainElement, filmsSectionComponent);

const filmsListComponent = new FilmsListComponent();

render(filmsSectionComponent.getElement(), filmsListComponent);

const filmsListContainerComponent = new FilmsListContainerComponent();

render(filmsListComponent.getElement(), filmsListContainerComponent);

const films = generateFilms(TOTAL_FILMS);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);
  const commentsListComponent = new CommentsListComponent();
  const commentComponents = film.comments.map((comment) => new CommentComponent(comment));

  render(container, filmCardComponent);

  const showFilmDetails = () => {
    document.body.classList.add('hide-overflow');

    render(document.body, filmDetailsComponent);
    render(
      filmDetailsComponent.getElement().querySelector('.film-details__comments-title'),
      commentsListComponent,
      renderPosition.AFTER,
    );

    commentComponents.forEach((commentComponent) => {
      render(commentsListComponent.getElement(), commentComponent);
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

for (let i = 0; i < showingFilmsCount; i++) {
  renderFilm(filmsListContainerComponent.getElement(), films[i]);
}

const showMoreButtonComponent = new ShowMoreButtonComponent();

render(filmsListComponent.getElement(), showMoreButtonComponent);

const showMoreFilms = () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
    renderFilm(filmsListContainerComponent.getElement(), film);

    if (showingFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
    }
  });
};

const showMoreButtonClickHandler = () => {
  showMoreFilms();
};

showMoreButtonComponent.setClickHandler(showMoreButtonClickHandler);

for (let i = 0; i < EXTRA_LIST_FILMS.length; i++) {
  render(filmsSectionComponent.getElement(), new FilmsListExtraComponent(EXTRA_LIST_FILMS[i].name));

  const filmsListExtraElements = filmsSectionComponent.getElement().querySelectorAll('.films-list--extra');

  render(filmsListExtraElements[i], new FilmsListContainerComponent());

  const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

  const sortFilms = cloneDeep(films)

  if(EXTRA_LIST_FILMS[i].sort === EXTRA_LIST_FILMS[0].sort) {
    sortFilms.sort((a, b) => b[EXTRA_LIST_FILMS[0].sort] - a[EXTRA_LIST_FILMS[0].sort])
  }

  if(EXTRA_LIST_FILMS[i].sort === EXTRA_LIST_FILMS[1].sort) {
    sortFilms.sort((a, b) => b[EXTRA_LIST_FILMS[1].sort].length - a[EXTRA_LIST_FILMS[1].sort].length)
  }

  for (let j = 0; j < FILMS_COUNT_IN_FILMS_LIST_EXTRA; j++) {
    renderFilm(filmsListExtraContainer, sortFilms[j]);
  }
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, new SiteStatisticsComponent(TOTAL_FILMS));
