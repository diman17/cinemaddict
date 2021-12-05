import { ShowMoreButtonComponent } from '../components/show-more-button-component';
import { remove, render, renderPosition } from '../utils/render';
import _, { cloneDeep } from 'lodash';
import { FilmController } from './film-controller';
import { SortingComponent, sortType } from '../components/sorting-component';
import { EXTRA_FILMS, FILMS_COUNT_IN_FILMS_LIST_EXTRA } from '../components/extra-films-section-component';
import { ExtraFilmsSectionComponent } from '../components/extra-films-section-component';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

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
    this._sortingComponent = new SortingComponent();

    this._topRatedComponent = new ExtraFilmsSectionComponent(EXTRA_FILMS[0]);
    this._mostCommentedComponent = new ExtraFilmsSectionComponent(EXTRA_FILMS[1]);

    this._handleShowMoreButton = this._handleShowMoreButton.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._onFilmChange = this._onFilmChange.bind(this);
    this._onFilmDetailsShow = this._onFilmDetailsShow.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    const newFilms = this._renderFilms(this._films, this._filmListContainer, 0, this._showingFilmsCount, this._onFilmChange, this._onFilmDetailsShow);

    this._renderShowMoreButton();

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderSort();

    this._renderExtraFilms(this._topRatedComponent, sortType.RATING);
    this._renderExtraFilms(this._mostCommentedComponent, sortType.COUNT_COMMENTS);
  }

  _renderShowMoreButton() {
    if (this._films.length <= this._showingFilmsCount) {
      remove(this._showMoreButtonComponent);
      return;
    }

    render(this._container.querySelector('.films-list'), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButton);
  }

  _renderSort() {
    render(this._container, this._sortingComponent, renderPosition.BEFORE);

    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderExtraFilms(component, sorting) {
    this._films = this._filmsModel.getFilms();

    const extraFilms = this._getExtraFilms(this._films, sorting, FILMS_COUNT_IN_FILMS_LIST_EXTRA);

    render(this._container, component);
    this._renderFilms(extraFilms, component.getElement().querySelector('.films-list__container'), 0, extraFilms.length, this._onFilmChange, this._onFilmDetailsShow);
  }

  _renderFilms(films, container, from, to, onFilmChange, onFilmDetailsShow) {
    return films.slice(from, to).map((film) => {
      const filmController = new FilmController(container, onFilmChange, onFilmDetailsShow);
      filmController.render(film);
      return filmController;
    });
  }

  _getSortedFilms(films, sort, from, to) {
    let sortedFilms = [];
    const showingFilms = cloneDeep(films);
    if (sort === sortType.DEFAULT) {
      sortedFilms = showingFilms;
    } else {
      sortedFilms = showingFilms.sort((a, b) => b[sort] - a[sort]);
    }
    return sortedFilms.slice(from, to);
  }

  _getExtraFilms(films, sort, count) {
    let sortedFilms = cloneDeep(films);
    sortedFilms.sort((a, b) => b[sort] - a[sort]);
    return sortedFilms.slice(0, count);
  }

  _onFilmChange(oldFilm, newFilm) {
    const isSuccess = this._filmsModel.updateFilm(oldFilm.id, newFilm);

    if (isSuccess) {
      this._films = this._filmsModel.getFilms();

      this._showedFilmControllers.forEach((filmController) => {
        if (_.isEqual(filmController.film, oldFilm)) {
          filmController.rerender(newFilm);
        }
      });
    }
  }

  _onFilterChange() {
    this._filmListContainer.innerHTML = '';

    this._films = this._filmsModel.getFilms();

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = this._getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);
    const newFilms = this._renderFilms(sortedFilms, this._filmListContainer, 0, this._showingFilmsCount, this._onFilmChange, this._onFilmDetailsShow);

    this._renderShowMoreButton();

    this._showedFilmControllers = [].concat(newFilms);
  }

  _onFilmDetailsShow() {
    this._showedFilmControllers.forEach((filmController) => {
      if (filmController.filmDetailsController.isShowing) filmController.filmDetailsController.remove();
    });
  }

  _handleShowMoreButton() {
    this._films = this._filmsModel.getFilms();

    this._prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedFilms = this._getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);

    const newFilms = this._renderFilms(sortedFilms, this._filmListContainer, this._prevFilmsCount, this._showingFilmsCount, this._onFilmChange, this._onFilmDetailsShow);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(currentSortType) {
    this._films = this._filmsModel.getFilms();

    this._filmListContainer.innerHTML = '';

    this._currentSortType = currentSortType;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = this._getSortedFilms(this._films, this._currentSortType, 0, this._showingFilmsCount);
    const newFilms = this._renderFilms(sortedFilms, this._filmListContainer, 0, this._showingFilmsCount, this._onFilmChange, this._onFilmDetailsShow);

    this._renderShowMoreButton();

    this._showedFilmControllers = [].concat(newFilms);
  }
}
