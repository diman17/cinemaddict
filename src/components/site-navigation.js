import { getRandomIntegerNumber } from '../utils/common';
import { AbstractComponent } from './abstract-component';

const navigationItems = [
  {
    href: '#all',
    isActive: true,
    name: 'All movies',
    isCountable: false,
  },
  {
    href: '#watchlist',
    isActive: false,
    name: 'Watchlist',
    isCountable: true,
    count: getRandomIntegerNumber(0, 22),
  },
  {
    href: '#history',
    isActive: false,
    name: 'History',
    isCountable: true,
    count: getRandomIntegerNumber(0, 22),
  },
  {
    href: '#favorites',
    isActive: false,
    name: 'Favorites',
    isCountable: true,
    count: getRandomIntegerNumber(0, 22),
  },
];

const createSiteNavigationItem = (href, isActive, name, isCountable, count) => {
  return `<a href="${href}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">${name} ${
    isCountable ? `<span class="main-navigation__item-count">${count}</span>` : ''
  }</a>`;
};

const createSiteNavigationTemplate = () => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navigationItems.map((el) => createSiteNavigationItem(el.href, el.isActive, el.name, el.isCountable, el.count)).join('\n')}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export class SiteNavigationComponent extends AbstractComponent {
  getTemplate() {
    return createSiteNavigationTemplate();
  }
}
