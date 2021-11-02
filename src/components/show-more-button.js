import { AbstractComponent } from './abstract-component';

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export class ShowMoreButtonComponent extends AbstractComponent {
  
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
