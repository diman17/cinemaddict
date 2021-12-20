import { AbstractComponent } from './abstract-component';

export const sortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const createSortingTemplate = () => `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort="${sortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort="${sortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort="${sortType.RATING}">Sort by rating</a></li>
    </ul>`;

export class SortingComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = sortType.DEFAULT;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== 'A') return;

      const currentSortType = evt.target.dataset.sort;

      if (this._currentSortType === currentSortType) return;

      this._currentSortType = currentSortType;

      this.getElement()
        .querySelectorAll('.sort__button')
        .forEach((button) => {
          button.classList.remove('sort__button--active');
        });

      evt.target.classList.add('sort__button--active');

      handler(this._currentSortType);
    });
  }
}
