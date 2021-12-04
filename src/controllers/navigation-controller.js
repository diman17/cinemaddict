import { NavigationComponent } from '../components/navigation-component';
import { render } from '../utils/render';

export class NavigationController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._handleFilterLinkClick = this._handleFilterLinkClick.bind(this);
    this._onFilmChange = this._onFilmChange.bind(this);

    this._filmsModel.setFilmChangeHandler(this._onFilmChange);
  }

  render() {
    this._navigationComponent = new NavigationComponent(this._filmsModel.getFilmsAll(), this._filmsModel.getFilterType());

    render(this._container, this._navigationComponent);

    this._navigationComponent.setFilterLinkClickHandler(this._handleFilterLinkClick);
  }

  _handleFilterLinkClick(filterType) {
    this._filmsModel.setFilterType(filterType);
  }

  _onFilmChange() {
    this._navigationComponent.films = this._filmsModel.getFilmsAll();
    this._navigationComponent.currentFilterType = this._filmsModel.getFilterType();
    this._navigationComponent.rerender();
  }
}
