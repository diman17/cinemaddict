import { CommentComponent } from '../components/comment-component';
import { remove, render } from '../utils/render';

export class CommentController {
  constructor(container, comment, onCommentDelete) {
    this._container = container;
    this._comment = comment;
    this._onCommentDelete = onCommentDelete;

    this._commentComponent = new CommentComponent(this._comment);

    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
  }

  render() {
    render(this._container, this._commentComponent);
    this._commentComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _handleDeleteButtonClick() {
    this._onCommentDelete(this._comment._id);
  }
}
