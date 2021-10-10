const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template)
}

const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  )
}

const siteHeaderElement = document.querySelector('.header')

render(siteHeaderElement, createProfileTemplate())

const createSiteNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  )
}

const siteMainElement = document.querySelector('.main')

render(siteMainElement, createSiteNavigationTemplate())

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  )
}

render(siteMainElement, createSortTemplate())

const createFilmsSectionTemplate = () => {
  return (
    `<section class="films"></section>`
  )
}

render(siteMainElement, createFilmsSectionTemplate())

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  )
}

const filmsSectionElement = document.querySelector('.films')

render(filmsSectionElement, createFilmsListTemplate())

const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  )
}

const filmsListElement = filmsSectionElement.querySelector('.films-list')

render(filmsListElement, createFilmsListContainerTemplate())

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  )
}

const FILMS_COUNT_IN_FILMS_LIST = 5
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container')

for(let i = 0; i < FILMS_COUNT_IN_FILMS_LIST; i++) {
  render(filmsListContainerElement, createFilmCardTemplate())
}

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  )
}

render(filmsListElement, createShowMoreButtonTemplate())

const createFilmsListExtraTemplate = (extra) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${extra}</h2>
    </section>`
  )
}

render(filmsSectionElement, createFilmsListExtraTemplate('Top rated'))
render(filmsSectionElement, createFilmsListExtraTemplate('Most commented'))

const filmsListExtraElements = filmsSectionElement.querySelectorAll('.films-list--extra')

const filmsListTopRated = filmsListExtraElements[0]
const filmsListMostCommented = filmsListExtraElements[1]

render(filmsListTopRated, createFilmsListContainerTemplate())
render(filmsListMostCommented, createFilmsListContainerTemplate())

const FILMS_COUNT_IN_FILMS_LIST_EXTRA = 2

const filmsListTopRatedContainer = filmsListTopRated.querySelector('.films-list__container')

for(let i = 0; i < FILMS_COUNT_IN_FILMS_LIST_EXTRA; i++) {
  render(filmsListTopRatedContainer, createFilmCardTemplate())
}

const filmsListMostCommentedContainer = filmsListMostCommented.querySelector('.films-list__container')

for(let i = 0; i < FILMS_COUNT_IN_FILMS_LIST_EXTRA; i++) {
  render(filmsListMostCommentedContainer, createFilmCardTemplate())
}

createSiteStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  )
}

const footerStatisticsElement = document.querySelector('.footer__statistics')

render(footerStatisticsElement, createSiteStatisticsTemplate())


