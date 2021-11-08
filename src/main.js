import { ProfileComponent } from './components/profile';
import { SiteNavigationComponent } from './components/site-navigation';
import { SortComponent } from './components/sort';
import { FilmsSectionComponent } from './components/films-section';
import { SiteStatisticsComponent } from './components/site-statistics';
import { generateFilms } from './mock/film';
import { generateProfile } from './mock/profile';
import { render } from './utils/render';
import { PageController } from './controllers/page-controller';
import { TOTAL_FILMS } from './const';

const siteHeaderElement = document.querySelector('.header');

const profile = generateProfile();

render(siteHeaderElement, new ProfileComponent(profile));

const siteMainElement = document.querySelector('.main');

render(siteMainElement, new SiteNavigationComponent());

render(siteMainElement, new SortComponent());

const filmsSectionComponent = new FilmsSectionComponent();

render(siteMainElement, filmsSectionComponent);

const films = generateFilms(TOTAL_FILMS);

const pageController = new PageController(filmsSectionComponent.getElement(), filmsSectionComponent.extraFilmsList);

pageController.render(films);

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, new SiteStatisticsComponent(TOTAL_FILMS));
