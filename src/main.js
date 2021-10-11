import { createProfileTemplate } from './components/profile';
import { createSiteNavigationTemplate } from './components/siteNavigation';
import { createSortTemplate } from './components/sort';
import { createFilmsSectionTemplate } from './components/filmsSection';
import { createFilmsListTemplate } from './components/filmsList';
import { createFilmsListContainerTemplate } from './components/filmsListContainer';
import { createFilmCardTemplate } from './components/filmCard';
import { createShowMoreButtonTemplate } from './components/showMoreButton';
import { createFilmsListExtraTemplate } from './components/filmsListExtra';
import { createSiteStatisticsTemplate } from './components/siteStatistics';

const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createProfileTemplate());

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createSiteNavigationTemplate());

render(siteMainElement, createSortTemplate());

render(siteMainElement, createFilmsSectionTemplate());

const filmsSectionElement = document.querySelector('.films');

render(filmsSectionElement, createFilmsListTemplate());

const filmsListElement = filmsSectionElement.querySelector('.films-list');

render(filmsListElement, createFilmsListContainerTemplate());

const FILMS_COUNT_IN_FILMS_LIST = 5;
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT_IN_FILMS_LIST; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());

render(filmsSectionElement, createFilmsListExtraTemplate('Top rated'));
render(filmsSectionElement, createFilmsListExtraTemplate('Most commented'));

const filmsListExtraElements = filmsSectionElement.querySelectorAll('.films-list--extra');

const filmsListTopRated = filmsListExtraElements[0];
const filmsListMostCommented = filmsListExtraElements[1];

render(filmsListTopRated, createFilmsListContainerTemplate());
render(filmsListMostCommented, createFilmsListContainerTemplate());

const FILMS_COUNT_IN_FILMS_LIST_EXTRA = 2;

const filmsListTopRatedContainer = filmsListTopRated.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT_IN_FILMS_LIST_EXTRA; i++) {
  render(filmsListTopRatedContainer, createFilmCardTemplate());
}

const filmsListMostCommentedContainer = filmsListMostCommented.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT_IN_FILMS_LIST_EXTRA; i++) {
  render(filmsListMostCommentedContainer, createFilmCardTemplate());
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createSiteStatisticsTemplate());
