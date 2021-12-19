import { FilmsCountComponent } from '../components/films-count-component';
import { FilmsLoadingSectionComponent } from '../components/films-loading-section-component';
import { NavigationComponent } from '../components/navigation-component';
import { SortingComponent } from '../components/sorting-component';
import { filterType } from '../utils/filter';
import { remove, render } from '../utils/render';

export class PreloadController {
  constructor(mainContainer, footerContainer) {
    this._films = [];
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._navigationComponent = new NavigationComponent(this._films, filterType.ALL);
    this._sortingComponent = new SortingComponent();
    this._filmsLoadingSectionComponent = new FilmsLoadingSectionComponent();
    this._filmsCountComponent = new FilmsCountComponent(this._films.length);
  }

  render() {
    render(this._mainContainer, this._navigationComponent);
    render(this._mainContainer, this._sortingComponent);
    render(this._mainContainer, this._filmsLoadingSectionComponent);
    render(this._footerContainer, this._filmsCountComponent);
  }

  remove() {
    remove(this._navigationComponent);
    remove(this._sortingComponent);
    remove(this._filmsLoadingSectionComponent);
    remove(this._filmsCountComponent);
  }
}
