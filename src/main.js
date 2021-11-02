import { ProfileComponent } from './components/profile';
import { SiteNavigationComponent } from './components/site-navigation';
import { SortComponent } from './components/sort';
import { FilmsSectionComponent } from './components/films-section';
import { FilmsListComponent } from './components/films-list';
import { SiteStatisticsComponent } from './components/site-statistics';
import { generateFilms } from './mock/film';
import { generateProfile } from './mock/profile';
import { render } from './utils/render';
import { PageController, renderFilm } from './controllers/page-controller';
import { EXTRA_LIST_FILMS, FILMS_COUNT_IN_FILMS_LIST_EXTRA, TOTAL_FILMS } from './const';
import { FilmsListExtraComponent } from './components/films-list-extra';
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

const films = generateFilms(TOTAL_FILMS);

const pageController = new PageController(filmsListComponent.getElement().querySelector('.films-list__container'));
pageController.render(films);

for (let i = 0; i < EXTRA_LIST_FILMS.length; i++) {
  render(filmsSectionComponent.getElement(), new FilmsListExtraComponent(EXTRA_LIST_FILMS[i].name));

  const filmsListExtraElements = filmsSectionComponent.getElement().querySelectorAll('.films-list--extra');

  const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

  const sortFilms = cloneDeep(films);

  if (EXTRA_LIST_FILMS[i].sort === EXTRA_LIST_FILMS[0].sort) {
    sortFilms.sort((a, b) => b[EXTRA_LIST_FILMS[0].sort] - a[EXTRA_LIST_FILMS[0].sort]);
  }

  if (EXTRA_LIST_FILMS[i].sort === EXTRA_LIST_FILMS[1].sort) {
    sortFilms.sort((a, b) => b[EXTRA_LIST_FILMS[1].sort].length - a[EXTRA_LIST_FILMS[1].sort].length);
  }

  for (let j = 0; j < FILMS_COUNT_IN_FILMS_LIST_EXTRA; j++) {
    renderFilm(filmsListExtraContainer, sortFilms[j]);
  }
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, new SiteStatisticsComponent(TOTAL_FILMS));
