import { ShowMoreButtonComponent } from '../components/show-more-button';
import { remove, render, renderPosition, replace } from '../utils/render';
import _, { cloneDeep } from 'lodash';
import { FilmController } from './film-controller';
import { SortComponent, sortType } from '../components/sort';
import { generateFilms, TOTAL_FILMS } from '../mock/film';
import { EXTRA_FILMS, FILMS_COUNT_IN_FILMS_LIST_EXTRA } from '../components/extra-films-section';
import { ExtraFilmsSectionComponent } from '../components/extra-films-section';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (films, container, from, to, onDataChange) => {
  return films.slice(from, to).map((film) => {
    const filmController = new FilmController(container, film, onDataChange);
    filmController.render();
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
  constructor(container) {
    this._container = container;
    this._filmListContainer = this._container.querySelector('.films-list__container');

    this._films = generateFilms(TOTAL_FILMS);
    this._sortFilms = [];
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
    const newFilms = renderFilms(this._films, this._filmListContainer, 0, this._showingFilmsCount, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();
    this._renderSort();

    this._renderExtraFilms(this._topRatedComponent, sortType.RATING);
    this._renderExtraFilms(this._mostCommentedComponent, sortType.COUNT_COMMENTS);
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((film) => _.isEqual(film, oldData));

    if (index === -1) return;

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    this._sortFilms = getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);

    const newFilmController = new FilmController(this._filmListContainer, this._sortFilms[index], this._onDataChange);
    const newFilmCardComponent = newFilmController._filmCardComponent;
    const newFilmDetailsComponent = newFilmController._filmDetailsComponent;

    replace(newFilmCardComponent, this._showedFilmControllers[index]._filmCardComponent);
    replace(newFilmDetailsComponent, this._showedFilmControllers[index]._filmDetailsComponent);

    newFilmController.renderComments();

    this._showedFilmControllers[index] = newFilmController;
  }

  _handleShowMoreButton() {
    this._prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    this._sortFilms = getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);

    const newFilms = renderFilms(this._sortFilms, this._filmListContainer, this._prevFilmsCount, this._showingFilmsCount, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

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
    this._filmListContainer.innerHTML = '';

    this._currentSortType = currentSortType;
    const sortFilms = getSortedFilms(this._films, currentSortType, 0, this._showingFilmsCount);

    const newFilms = renderFilms(sortFilms, this._filmListContainer, 0, this._showingFilmsCount, this._onDataChange);
    this._showedFilmControllers = [].concat(newFilms);
  }

  _renderSort() {
    render(this._container, this._sortComponent, renderPosition.BEFORE);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderExtraFilms(component, sorting) {
    const extraFilms = getExtraFilms(this._films, sorting, FILMS_COUNT_IN_FILMS_LIST_EXTRA);

    render(this._container, component);
    renderFilms(extraFilms, component.getElement().querySelector('.films-list__container'), 0, extraFilms.length, this._onDataChange);
  }
}
