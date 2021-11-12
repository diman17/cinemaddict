import { ProfileComponent } from './components/profile';
import { SiteNavigationComponent } from './components/site-navigation';
import { FilmsSectionComponent } from './components/films-section';
import { SiteStatisticsComponent } from './components/site-statistics';
import { generateProfile } from './mock/profile';
import { render } from './utils/render';
import { PageController } from './controllers/page-controller';
import { TOTAL_FILMS } from './const';
import { NoDataSectionComponent } from './components/no-data-section';

const siteHeaderElement = document.querySelector('.header');

const profile = generateProfile();

render(siteHeaderElement, new ProfileComponent(profile));

const siteMainElement = document.querySelector('.main');

render(siteMainElement, new SiteNavigationComponent());

if (!TOTAL_FILMS) {
  render(siteMainElement, new NoDataSectionComponent());
} else {
  const filmsSectionComponent = new FilmsSectionComponent();

  render(siteMainElement, filmsSectionComponent);

  const pageController = new PageController(filmsSectionComponent.getElement(), filmsSectionComponent.extraFilmsList);

  pageController.renderFilms(pageController.films);
  pageController.renderShowMoreButton();
  pageController.renderExtraFilms();
  pageController.renderSort();
}

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, new SiteStatisticsComponent(TOTAL_FILMS));
