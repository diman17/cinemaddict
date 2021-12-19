import { AbstractComponent } from './abstract-component';

const createCommentTemplate = (comment) => {
  const { srcEmoji, text, author, day } = comment;

  const getFormatDay = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    let month = date.getMonth();

    if (month < 10) {
      month = `0${month}`;
    }

    let day = date.getDate();

    if (day < 10) {
      day = `0${day}`;
    }

    return `${day}/${month}/${year}`;
  };

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${srcEmoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getFormatDay(day)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement()
      .querySelector('.film-details__comment-delete')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}
