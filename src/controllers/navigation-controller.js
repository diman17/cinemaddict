import { SiteNavigationComponent } from '../components/site-navigation';
import { render } from '../utils/render';

export class NavigationController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._navigationComponent = new SiteNavigationComponent();
  }
  render() {
    render(this._container, this._navigationComponent);
  }
}
