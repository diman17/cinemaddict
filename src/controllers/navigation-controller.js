import { NavigationComponent } from '../components/navigation-component';
import { render } from '../utils/render';

export class NavigationController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._handleFilterLinkClick = this._handleFilterLinkClick.bind(this);
  }

  render() {
    this._navigationComponent = new NavigationComponent(this._filmsModel.getFilmsAll());

    render(this._container, this._navigationComponent);

    this._navigationComponent.setFilterLinkClickHandler(this._handleFilterLinkClick);
  }

  _handleFilterLinkClick(filterType) {
    this._filmsModel.setFilterType(filterType);
  }
}
