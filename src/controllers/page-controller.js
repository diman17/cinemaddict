import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render, renderPosition } from '../utils/render';
import _, { cloneDeep } from 'lodash';
import { FilmController } from './film-controller';
import { SortComponent, sortType } from '../components/sort';
import { EXTRA_FILMS, FILMS_COUNT_IN_FILMS_LIST_EXTRA } from '../components/extra-films-section';
import { ExtraFilmsSectionComponent } from '../components/extra-films-section';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (films, container, from, to, onDataChange) => {
  return films.slice(from, to).map((film) => {
    const filmController = new FilmController(container, onDataChange);
    filmController.render(film);
    return filmController;
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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmListContainer = this._container.querySelector('.films-list__container');

    this._filmsModel = filmsModel;

    this._films = [];
    this._showedFilmControllers = [];
    this._currentSortType = sortType.DEFAULT;

    this._prevFilmsCount = 0;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._topRatedComponent = new ExtraFilmsSectionComponent(EXTRA_FILMS[0]);
    this._mostCommentedComponent = new ExtraFilmsSectionComponent(EXTRA_FILMS[1]);

    this._handleShowMoreButton = this._handleShowMoreButton.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    const newFilms = renderFilms(this._films, this._filmListContainer, 0, this._showingFilmsCount, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();
    this._renderSort();

    this._renderExtraFilms(this._topRatedComponent, sortType.RATING);
    this._renderExtraFilms(this._mostCommentedComponent, sortType.COUNT_COMMENTS);
  }

  _renderShowMoreButton() {
    if (this._films.length <= SHOWING_FILMS_COUNT_ON_START) return;

    render(this._container.querySelector('.films-list'), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButton);
  }

  _renderSort() {
    render(this._container, this._sortComponent, renderPosition.BEFORE);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderExtraFilms(component, sorting) {
    this._films = this._filmsModel.getFilms();

    const extraFilms = getExtraFilms(this._films, sorting, FILMS_COUNT_IN_FILMS_LIST_EXTRA);

    render(this._container, component);
    renderFilms(extraFilms, component.getElement().querySelector('.films-list__container'), 0, extraFilms.length, this._onDataChange);
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      this._films = this._filmsModel.getFilms();

      this._showedFilmControllers.forEach((filmController) => {
        if (_.isEqual(filmController.film, oldData)) {
          filmController.rerender(newData);
        }
      });
    }
  }

  _handleShowMoreButton() {
    this._films = this._filmsModel.getFilms();

    this._prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);

    const newFilms = renderFilms(sortedFilms, this._filmListContainer, this._prevFilmsCount, this._showingFilmsCount, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(currentSortType) {
    this._films = this._filmsModel.getFilms();

    this._filmListContainer.innerHTML = '';

    this._currentSortType = currentSortType;

    const sortedFilms = getSortedFilms(this._films, currentSortType, 0, this._showingFilmsCount);
    const newFilms = renderFilms(sortedFilms, this._filmListContainer, 0, this._showingFilmsCount, this._onDataChange);

    this._showedFilmControllers = [].concat(newFilms);
  }
}
