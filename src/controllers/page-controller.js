import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render } from '../utils/render';
import { cloneDeep } from 'lodash';
import { FilmController } from './film-controller';

export class PageController {
  constructor(container, extraFilmsList) {
    this._container = container;
    this._extraFilmsList = extraFilmsList;

    this._showing_films_count_on_start = 5;
    this._showing_films_count_by_button = 5;
    this._films_count_in_films_list_extra = 2;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  renderFilms(films) {
    let showingFilmsCount = this._showing_films_count_on_start;

    for (let i = 0; i < showingFilmsCount; i++) {
      const filmController = new FilmController(this._container.querySelector('.films-list__container'), films[i]);
      filmController.renderFilm();
    }

    render(this._container.querySelector('.films-list'), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + this._showing_films_count_by_button;
      films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
        const filmController = new FilmController(this._container.querySelector('.films-list__container'), film);
        filmController.renderFilm();

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    });
  }

  renderExtraFilms(films) {
    for (let i = 0; i < this._extraFilmsList.length; i++) {
      const filmsListExtraElements = this._container.querySelectorAll('.films-list--extra');

      const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

      const sortFilms = cloneDeep(films);
      sortFilms.sort((a, b) => b[this._extraFilmsList[i].sort] - a[this._extraFilmsList[i].sort]);

      for (let j = 0; j < this._films_count_in_films_list_extra; j++) {
        const filmController = new FilmController(filmsListExtraContainer, sortFilms[j]);
        filmController.renderFilm();
      }
    }
  }
}
