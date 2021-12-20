export const filterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const getFilmsByAllFilter = (films) => films;

export const getFilmsByWatchlistFilter = (films) => films.filter((film) => film.isWatchlist);

export const getFilmsByHistoryFilter = (films) => films.filter((film) => film.isWatched);

export const getFilmsByFavoritesFilter = (films) => films.filter((film) => film.isFavorite);

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
    default:
      break;
  }
};
