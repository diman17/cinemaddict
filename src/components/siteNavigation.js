import { generateSiteNavigationItems } from '../mock/siteNavigation';

const createSiteNavigationItem = (href, isActive, name, isCountable, count) => {
  return `<a href="${href}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">${name} ${
    isCountable ? `<span class="main-navigation__item-count">${count}</span>` : ''
  }</a>`;
};

export const createSiteNavigationTemplate = () => {
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
