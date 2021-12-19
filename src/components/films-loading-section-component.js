import { AbstractComponent } from './abstract-component';

const createFilmsLoadingSectionTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`;
};

export class FilmsLoadingSectionComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsLoadingSectionTemplate();
  }
}
