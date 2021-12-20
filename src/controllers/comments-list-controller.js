import { CommentsListComponent } from '../components/comments-list-component';
import { remove, render } from '../utils/render';
import { CommentController } from './comment-controller';

export class CommentsListController {
  constructor(container, film, filmsModel, api) {
    this._container = container;
    this._film = film;
    this._filmsModel = filmsModel;
    this._api = api;

    this._onCommentDelete = this._onCommentDelete.bind(this);
  }

  render() {
    this._commentsListComponent = new CommentsListComponent(this._film);

    render(this._container, this._commentsListComponent);

    this._commentsListComponent.setEmojiesClickHandler();

    this._renderComments();
  }

  remove() {
    this._removeComments();
    remove(this._commentsListComponent);
  }

  _renderComments() {
    const commentContainer = this._commentsListComponent.getElement().querySelector('.film-details__comments-list');
    this._commentControllers = this._film.comments.map(
      (comment) => new CommentController(commentContainer, comment, this._onCommentDelete),
    );
    this._commentControllers.forEach((controller) => controller.render());
  }

  _removeComments() {
    this._commentControllers.forEach((controller) => controller.destroy());
  }

  _onCommentDelete(commentId) {
    this._api.deleteComment(this._film._id, commentId).then(() => {
      this._filmsModel.deleteComment(commentId, this._film._id);
      this._film = this._filmsModel.getFilmById(this._film._id);
      this.remove();
      this.render();
    });
  }
}
