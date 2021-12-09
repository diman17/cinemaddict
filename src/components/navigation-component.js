import { filterType, getFilmsByAllFilter, getFilmsByFavoritesFilter, getFilmsByHistoryFilter, getFilmsByWatchlistFilter } from '../utils/filter';
import { AbstractSmartComponent } from './abstract-smart-component';

const createNavigationItemTempalate = (href, isActive, name, filter, isCountable, count) => {
  return `<a href="${href}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}" data-filter="${filter}">${name} ${
    isCountable ? `<span class="main-navigation__item-count">${count}</span>` : ''
  }</a>`;
};

const createNavigationTemplate = (films, currentFilterType) => {
  const navigationItems = [
    {
      href: '#all',
      isActive: currentFilterType === filterType.ALL,
      name: 'All movies',
      filter: filterType.ALL,
      isCountable: false,
      getCount: getFilmsByAllFilter,
    },
    {
      href: '#watchlist',
      isActive: currentFilterType === filterType.WATCHLIST,
      name: 'Watchlist',
      filter: filterType.WATCHLIST,
      isCountable: true,
      getCount: getFilmsByWatchlistFilter,
    },
    {
      href: '#history',
      isActive: currentFilterType === filterType.HISTORY,
      name: 'History',
      filter: filterType.HISTORY,
      isCountable: true,
      getCount: getFilmsByHistoryFilter,
    },
    {
      href: '#favorites',
      isActive: currentFilterType === filterType.FAVORITES,
      name: 'Favorites',
      filter: filterType.FAVORITES,
      isCountable: true,
      getCount: getFilmsByFavoritesFilter,
    },
  ];

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationItems.map((el) => createNavigationItemTempalate(el.href, el.isActive, el.name, el.filter, el.isCountable, el.getCount(films).length)).join('\n')}
      </div>
    </nav>`;
};

export class NavigationComponent extends AbstractSmartComponent {
  constructor(films, currentFilterType) {
    super();
    this.films = films;
    this.currentFilterType = currentFilterType;
  }

  getTemplate() {
    return createNavigationTemplate(this.films, this.currentFilterType);
  }

  recoveryListeners() {
    this.setFilterLinkClickHandler(this._handleFilterLinkClick);
  }

  rerender() {
    super.rerender();
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
    this._handleFilterLinkClick = handler;
  }
}
