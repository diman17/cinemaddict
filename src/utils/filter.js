export const filterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const getFilmsByFilter = (films, currentFilterType) => {
  switch (currentFilterType) {
    case filterType.ALL:
      return getFilmsByAllFilter(films);
    case filterType.WATCHLIST:
      return getFilmsByWatchlistFilter(films);
    case filterType.HISTORY:
      return getFilmsByHistoryFilter(films);
    case filterType.FAVORITES:
      return getFilmsByFavoritesFilter(films);
  }
};

export const getFilmsByAllFilter = (films) => {
  return films;
};

export const getFilmsByWatchlistFilter = (films) => {
  return films.filter((film) => film.isWatchlist);
};

export const getFilmsByHistoryFilter = (films) => {
  return films.filter((film) => film.isWatched);
};

export const getFilmsByFavoritesFilter = (films) => {
  return films.filter((film) => film.isFavorite);
};
