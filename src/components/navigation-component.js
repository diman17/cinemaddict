import { filterType, getFilmsByAllFilter, getFilmsByFavoritesFilter, getFilmsByHistoryFilter, getFilmsByWatchlistFilter } from '../utils/filter';
import { AbstractComponent } from './abstract-component';

const navigationItems = [
  {
    href: '#all',
    isActive: true,
    name: 'All movies',
    filter: filterType.ALL,
    isCountable: false,
    getCount: getFilmsByAllFilter,
  },
  {
    href: '#watchlist',
    isActive: false,
    name: 'Watchlist',
    filter: filterType.WATCHLIST,
    isCountable: true,
    getCount: getFilmsByWatchlistFilter,
  },
  {
    href: '#history',
    isActive: false,
    name: 'History',
    filter: filterType.HISTORY,
    isCountable: true,
    getCount: getFilmsByHistoryFilter,
  },
  {
    href: '#favorites',
    isActive: false,
    name: 'Favorites',
    filter: filterType.FAVORITES,
    isCountable: true,
    getCount: getFilmsByFavoritesFilter,
  },
];

const createNavigationItemTempalate = (href, isActive, name, filter, isCountable, count) => {
  return `<a href="${href}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}" data-filter="${filter}">${name} ${
    isCountable ? `<span class="main-navigation__item-count">${count}</span>` : ''
  }</a>`;
};

const createNavigationTemplate = (films) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navigationItems.map((el) => createNavigationItemTempalate(el.href, el.isActive, el.name, el.filter, el.isCountable, el.getCount(films).length)).join('\n')}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export class NavigationComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }
  getTemplate() {
    return createNavigationTemplate(this._films);
  }

  setFilterLinkClickHandler(handler) {
    this._element.querySelector('.main-navigation__items').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('main-navigation__item--active')) return;

      this._element.querySelectorAll('.main-navigation__item').forEach((item) => {
        item.classList.remove('main-navigation__item--active');
      });

      if (evt.target.classList.contains('main-navigation__item-count')) {
        evt.target.closest('.main-navigation__item').classList.add('main-navigation__item--active');
        const currentFilter = evt.target.closest('.main-navigation__item').dataset.filter;
        handler(currentFilter);
      } else {
        evt.target.classList.add('main-navigation__item--active');
        const currentFilter = evt.target.dataset.filter;
        handler(currentFilter);
      }
    });
  }
}
