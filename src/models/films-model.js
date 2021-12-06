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

  setFilms(films) {
    this._films = Array.from(films);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) return;

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._filmChangeHandlers);

    return true;
  }

  getFilterType() {
    return this._currentFilterType;
  }

  setFilterType(filterType) {
    this._currentFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  deleteComment(commentId, filmId) {
    this._films.forEach((film) => {
      if (film.id === filmId) {
        film.comments.forEach((comment, i) => {
          if (comment.id === commentId) {
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
