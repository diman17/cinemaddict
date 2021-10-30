import { ProfileComponent } from './components/profile';
import { SiteNavigationComponent } from './components/siteNavigation';
import { SortComponent } from './components/sort';
import { FilmsSectionComponent } from './components/filmsSection';
import { FilmsListComponent } from './components/filmsList';
import { FilmsListContainerComponent } from './components/filmsListContainer';
import { ShowMoreButtonComponent } from './components/showMoreButton';
import { FilmsListExtraComponent } from './components/filmsListExtra';
import { SiteStatisticsComponent } from './components/siteStatistics';
import { generateFilms } from './mock/film';
import { generateProfile } from './mock/profile';
import {
  EXTRA_LIST_FILMS,
  FILMS_COUNT_IN_FILMS_LIST_EXTRA,
  renderPosition,
  SHOWING_FILMS_COUNT_BY_BUTTON,
  SHOWING_FILMS_COUNT_ON_START,
  TOTAL_FILMS,
} from './const';
import { render } from './utils';
import { FilmCardComponent } from './components/filmCard';
import { FilmDetailsComponent } from './components/filmDetails';
import { CommentsListComponent } from './components/commentsList';
import { CommentComponent } from './components/comment';

const siteHeaderElement = document.querySelector('.header');

const profile = generateProfile();

render(siteHeaderElement, new ProfileComponent(profile).getElement());

const siteMainElement = document.querySelector('.main');

render(siteMainElement, new SiteNavigationComponent().getElement());

render(siteMainElement, new SortComponent().getElement());

const filmsSectionComponent = new FilmsSectionComponent();

render(siteMainElement, filmsSectionComponent.getElement());

const filmsListComponent = new FilmsListComponent();

render(filmsSectionComponent.getElement(), filmsListComponent.getElement());

const filmsListContainerComponent = new FilmsListContainerComponent();

render(filmsListComponent.getElement(), filmsListContainerComponent.getElement());

const films = generateFilms(TOTAL_FILMS);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const renderFilm = (container, film) => {
  const filmCardElement = new FilmCardComponent(film).getElement();
  const filmDetailsElement = new FilmDetailsComponent(film).getElement();
  const commentsListElement = new CommentsListComponent().getElement();

  render(container, filmCardElement);

  const commentsListTitle = filmDetailsElement.querySelector('.film-details__comments-title');

  const poster = filmCardElement.querySelector('.film-card__poster');
  const title = filmCardElement.querySelector('.film-card__title');
  const comments = filmCardElement.querySelector('.film-card__comments');

  const closeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    filmDetailsElement.remove();
  };

  const showFilmDetails = () => {
    document.body.classList.add('hide-overflow');
    render(document.body, filmDetailsElement);
    render(commentsListTitle, commentsListElement, renderPosition.AFTER);
    film.comments.forEach((comment) => {
      const commentElement = new CommentComponent(comment).getElement();
      render(commentsListElement, commentElement);
    });
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

  poster.addEventListener('click', posterClickHandler);
  title.addEventListener('click', titleClickHandler);
  comments.addEventListener('click', commentsClickHandler);

  const buttonClose = filmDetailsElement.querySelector('.film-details__close-btn');

  const buttonCloseHandler = () => {
    closeFilmDetails();
  };

  buttonClose.addEventListener('click', buttonCloseHandler);
};

for (let i = 0; i < showingFilmsCount; i++) {
  renderFilm(filmsListContainerComponent.getElement(), films[i]);
}

const showMoreButtonComponent = new ShowMoreButtonComponent();

render(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

showMoreButtonComponent.getElement().addEventListener('click', () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
    renderFilm(filmsListContainerComponent.getElement(), film);
  });

  if (showingFilmsCount >= films.length) {
    showMoreButtonComponent.getElement().remove();
  }
});

for (let i = 0; i < EXTRA_LIST_FILMS.length; i++) {
  render(filmsSectionComponent.getElement(), new FilmsListExtraComponent(EXTRA_LIST_FILMS[i].name).getElement());

  const filmsListExtraElements = filmsSectionComponent.getElement().querySelectorAll('.films-list--extra');

  render(filmsListExtraElements[i], new FilmsListContainerComponent().getElement());

  const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

  for (let j = 0; j < FILMS_COUNT_IN_FILMS_LIST_EXTRA; j++) {
    renderFilm(filmsListExtraContainer, films[j]);
  }
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, new SiteStatisticsComponent(TOTAL_FILMS).getElement());
