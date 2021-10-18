import { generateSiteNavigationItems } from '../mock/siteNavigation';
import { createElement } from '../utils';

const createSiteNavigationItem = (href, isActive, name, isCountable, count) => {
  return `<a href="${href}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">${name} ${
    isCountable ? `<span class="main-navigation__item-count">${count}</span>` : ''
  }</a>`;
};

const createSiteNavigationTemplate = () => {
  const siteNavigationItems = generateSiteNavigationItems()
    .map((el) => createSiteNavigationItem(el.href, el.isActive, el.name, el.isCountable, el.count))
    .join('\n');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${siteNavigationItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export class SiteNavigationComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteNavigationTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
