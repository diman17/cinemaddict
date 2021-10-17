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
import { generateFilms } from './mock/film';
import { generateProfile } from './mock/profile';
import { EXTRA_LIST_FILMS } from './const';

const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

const siteHeaderElement = document.querySelector('.header');

const profile = generateProfile();

render(siteHeaderElement, createProfileTemplate(profile));

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createSiteNavigationTemplate());

render(siteMainElement, createSortTemplate());

render(siteMainElement, createFilmsSectionTemplate());

const filmsSectionElement = document.querySelector('.films');

render(filmsSectionElement, createFilmsListTemplate());

const filmsListElement = filmsSectionElement.querySelector('.films-list');

render(filmsListElement, createFilmsListContainerTemplate());

const TOTAL_FILMS = 22;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

const films = generateFilms(TOTAL_FILMS);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

for (let i = 0; i < showingFilmsCount; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]));
}

render(filmsListElement, createShowMoreButtonTemplate());

const showMoreButton = filmsListElement.querySelector('.films-list__show-more');

showMoreButton.addEventListener('click', () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  films
    .slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const FILMS_COUNT_IN_FILMS_LIST_EXTRA = 2;

for (let i = 0; i < EXTRA_LIST_FILMS.length; i++) {
  render(filmsSectionElement, createFilmsListExtraTemplate(EXTRA_LIST_FILMS[i].name));

  const filmsListExtraElements = filmsSectionElement.querySelectorAll('.films-list--extra');

  render(filmsListExtraElements[i], createFilmsListContainerTemplate());

  const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

  for (let j = 0; j < FILMS_COUNT_IN_FILMS_LIST_EXTRA; j++) {
    render(filmsListExtraContainer, createFilmCardTemplate(films[[j]]));
  }
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createSiteStatisticsTemplate(TOTAL_FILMS));
