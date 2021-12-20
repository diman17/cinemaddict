import './css/normalize.css';
import './css/style.css';

import { ProfileComponent } from './components/profile-component';
import { FilmsSectionComponent } from './components/films-section-component';
import { FilmsCountComponent } from './components/films-count-component';
import { FilmsModel } from './models/films-model';
import { render } from './utils/render';
import { PageController } from './controllers/page-controller';
import { NavigationController } from './controllers/navigation-controller';
import { API } from './api/api';
import { PreloadController } from './controllers/preload-controller';

const api = new API();
const filmsModel = new FilmsModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');

const preloadController = new PreloadController(mainElement, footerElement);
preloadController.render();

api
  .getFilmsAll()
  .then((films) => {
    filmsModel.setFilms(films);

    return films;
  })
  .then((films) => {
    preloadController.remove();
    const navigationController = new NavigationController(mainElement, filmsModel);
    navigationController.render();

    return films;
  })
  .then((films) => {
    render(headerElement, new ProfileComponent(films));

    const filmsSectionComponent = new FilmsSectionComponent();
    render(mainElement, filmsSectionComponent);

    const pageController = new PageController(filmsSectionComponent.getElement(), filmsModel, api);
    pageController.render();

    render(footerElement, new FilmsCountComponent(films.length));
  });
