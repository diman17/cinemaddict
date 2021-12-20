import { filterType, getFilmsByFilter } from '../utils/filter';

export class FilmsModel {
  constructor() {
    this._films = [];

    this._currentFilterType = filterType.ALL;

    this._filterChangeHandlers = [];
    this._filmChangeHandlers = [];
    this._commentChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._currentFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  getFilmById(id) {
    return this._films.find((film) => film._id === id);
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  updateFilm(id, newFilm) {
    const index = this._films.findIndex((film) => film._id === id);

    if (index === -1) return;

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));

    this._callHandlers(this._filmChangeHandlers);

    return true;
  }

  getFilterType() {
    return this._currentFilterType;
  }

  setFilterType(filter) {
    this._currentFilterType = filter;
    this._callHandlers(this._filterChangeHandlers);
  }

  deleteComment(commentId, filmId) {
    this._films.forEach((film) => {
      if (film._id === filmId) {
        film.comments.forEach((comment, i) => {
          if (comment._id === commentId) {
            film.comments.splice(i, 1);
            film.countComments = film.comments.length;
          }
        });
      }
    });

    this._callHandlers(this._commentChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilmChangeHandler(handler) {
    this._filmChangeHandlers.push(handler);
  }

  setCommentChangeHandler(handler) {
    this._commentChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
