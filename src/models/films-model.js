import { filterType, getFilmsByFilter } from '../utils/filter';

export class FilmsModel {
  constructor() {
    this._films = [];

    this._currentFilterType = filterType.ALL;

    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._currentFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) return;

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    return true;
  }

  getFilterType() {
    return this._currentFilterType;
  }

  setFilterType(filterType) {
    this._currentFilterType = filterType;
    this.callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
