import { AbstractComponent } from './abstract-component';

const createSiteStatisticsTemplate = (count) => {
  return `<p>${count} movies inside</p>`;
};

export class SiteStatisticsComponent extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createSiteStatisticsTemplate(this._count);
  }
}
