import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render, renderPosition } from '../utils/render';
import { cloneDeep } from 'lodash';
import { FilmController } from './film-controller';
import { SortComponent, sortType } from '../components/sort';
import { generateFilms, TOTAL_FILMS } from '../mock/film';
import { EXTRA_FILMS, FILMS_COUNT_IN_FILMS_LIST_EXTRA } from '../components/extra-films-section';
import { ExtraFilmsSectionComponent } from '../components/extra-films-section';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (films, container, from, to) => {
  films.slice(from, to).forEach((film) => {
    const filmController = new FilmController(container, film);
    filmController.render();
  });
};

const getSortedFilms = (films, sort, from, to) => {
  let sortedFilms = [];
  const showingFilms = cloneDeep(films);
  if (sort === sortType.DEFAULT) {
    sortedFilms = showingFilms;
  } else {
    sortedFilms = showingFilms.sort((a, b) => b[sort] - a[sort]);
  }
  return sortedFilms.slice(from, to);
};

const getExtraFilms = (films, sort, count) => {
  let sortedFilms = cloneDeep(films);
  sortedFilms.sort((a, b) => b[sort] - a[sort]);
  return sortedFilms.slice(0, count);
};

export class PageController {
  constructor(container) {
    this._container = container;

    this._films = generateFilms(TOTAL_FILMS);
    this._sortFilms = [];
    this._currentSortType = sortType.DEFAULT;

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._topRatedComponent = new ExtraFilmsSectionComponent(EXTRA_FILMS[0]);
    this._mostCommentedComponent = new ExtraFilmsSectionComponent(EXTRA_FILMS[1]);

    this._handleShowMoreButton = this._handleShowMoreButton.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  render() {
    renderFilms(this._films, this._container.querySelector('.films-list__container'), 0, this._showingFilmsCount);

    this._renderShowMoreButton();
    this._renderSort();

    this._renderExtraFilms(this._topRatedComponent);
    this._renderExtraFilms(this._mostCommentedComponent);
  }

  _handleShowMoreButton() {
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    this._sortFilms = getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);

    renderFilms(this._sortFilms, this._container.querySelector('.films-list__container'), prevFilmsCount, this._showingFilmsCount);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._films.length <= SHOWING_FILMS_COUNT_ON_START) return;

    render(this._container.querySelector('.films-list'), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButton);
  }

  _handleSortTypeChange(currentSortType) {
    this._container.querySelector('.films-list__container').innerHTML = '';

    this._currentSortType = currentSortType;
    const sortFilms = getSortedFilms(this._films, currentSortType, 0, this._showingFilmsCount);

    renderFilms(sortFilms, this._container.querySelector('.films-list__container'), 0, this._showingFilmsCount);
  }

  _renderSort() {
    render(this._container, this._sortComponent, renderPosition.BEFORE);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderExtraFilms(component, sorting) {
    const extraFilms = getExtraFilms(this._films, sorting, FILMS_COUNT_IN_FILMS_LIST_EXTRA);

    render(this._container, component);
    renderFilms(extraFilms, component.getElement().querySelector('.films-list__container'), 0, extraFilms.length);
  }
}
