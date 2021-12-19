const URL_API = 'http://localhost:3000/api';

export class API {
  constructor() {
    this._url = URL_API;
  }

  async getFilmsAll() {
    let films = await fetch(`${this._url}/films`);
    films = await films.json();
    return films;
  }

  async updateFilm(filmId, film) {
    let updatedFilm = await fetch(`${this._url}/films/${filmId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(film),
    });

    updatedFilm = await updatedFilm.json();
    return updatedFilm;
  }

  async deleteComment(filmId, commentId) {
    await fetch(`${this._url}/films/${filmId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  async createComment(filmId, comment) {
    await fetch(`${this._url}/films/${filmId}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(comment),
    });
  }
}
