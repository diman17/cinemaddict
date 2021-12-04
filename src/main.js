import { ProfileComponent } from './components/profile-component';
import { FilmsSectionComponent } from './components/films-section-component';
import { FilmsCountComponent } from './components/films-count-component';
import { generateProfile } from './mock/profile';
import { FilmsModel } from './models/films-model';
import { render } from './utils/render';
import { PageController } from './controllers/page-controller';
import { NoDataSectionComponent } from './components/no-data-section-component';
import { generateFilms, TOTAL_FILMS } from './mock/film';
import { NavigationController } from './controllers/navigation-controller';

const films = generateFilms(TOTAL_FILMS);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector('.header');

const profile = generateProfile();

render(siteHeaderElement, new ProfileComponent(profile));

const siteMainElement = document.querySelector('.main');

const navigationController = new NavigationController(siteMainElement, filmsModel);
navigationController.render();

if (!TOTAL_FILMS) {
  render(siteMainElement, new NoDataSectionComponent());
} else {
  const filmsSectionComponent = new FilmsSectionComponent();

  render(siteMainElement, filmsSectionComponent);

  const pageController = new PageController(filmsSectionComponent.getElement(), filmsModel);

  pageController.render();
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, new FilmsCountComponent(TOTAL_FILMS));
