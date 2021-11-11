import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render, renderPosition } from '../utils/render';
import { cloneDeep } from 'lodash';
import { FilmController } from './film-controller';
import { SortComponent, sortType } from '../components/sort';
import { generateFilms } from '../mock/film';
import { TOTAL_FILMS } from '../const';

export class PageController {
  constructor(container, extraFilmsList) {
    this._container = container;
    this._extraFilmsList = extraFilmsList;

    this.films = generateFilms(TOTAL_FILMS);
    this._sortFilms = cloneDeep(this.films);

    this._showingFilmsCountOStart = 5;
    this._showingFilmsCount = this._showingFilmsCountOStart;
    this._prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCountByButton = 5;
    this._filmsCountInFilmsListExtra = 2;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  renderFilms(films) {
    for (let i = 0; i < this._showingFilmsCount; i++) {
      const filmController = new FilmController(this._container.querySelector('.films-list__container'), films[i]);
      filmController.renderFilm();
    }
  }

  renderShowMoreButton() {
    render(this._container.querySelector('.films-list'), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + this._showingFilmsCountByButton;

      if (this._showingFilmsCount > this._sortFilms.length) this._showingFilmsCount = this._sortFilms.length;

      this._sortFilms.slice(this._prevFilmsCount, this._showingFilmsCount).forEach((film) => {
        const filmController = new FilmController(this._container.querySelector('.films-list__container'), film);
        filmController.renderFilm();

        if (this._showingFilmsCount === this._sortFilms.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    });
  }

  renderExtraFilms() {
    for (let i = 0; i < this._extraFilmsList.length; i++) {
      const filmsListExtraElements = this._container.querySelectorAll('.films-list--extra');

      const filmsListExtraContainer = filmsListExtraElements[i].querySelector('.films-list__container');

      const sortFilms = this._sortFilms;
      sortFilms.sort((a, b) => b[this._extraFilmsList[i].sort] - a[this._extraFilmsList[i].sort]);

      for (let j = 0; j < this._filmsCountInFilmsListExtra; j++) {
        const filmController = new FilmController(filmsListExtraContainer, sortFilms[j]);
        filmController.renderFilm();
      }
    }
  }

  renderSort() {
    render(this._container, this._sortComponent, renderPosition.BEFORE);

    this._sortComponent.setSortTypeChangeHandler((currentSortType) => {
      this._container.querySelector('.films-list__container').innerHTML = '';

      if (currentSortType === sortType.DEFAULT) {
        this._sortFilms = cloneDeep(this.films);
        this.renderFilms(this._sortFilms);
        return;
      }

      this._sortFilms.sort((a, b) => b[currentSortType] - a[currentSortType]);
      this.renderFilms(this._sortFilms);
    });
  }
}
