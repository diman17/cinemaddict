import { AbstractComponent } from './abstract-component';

const emojies = ['smile', 'sleeping', 'puke', 'angry'];

const createEmojiTemplate = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`;
};

const createCommentsListTemplate = (film) => {
  const { countComments } = film;
  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>

    <ul class="film-details__comments-list"></ul>

    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojies.map((el) => createEmojiTemplate(el)).join('\n')}
      </div>
    </div>
  </section>`;
};

export class CommentsListComponent extends AbstractComponent {
  constructor(film) {
    super();

    this.film = film;
  }

  getTemplate() {
    return createCommentsListTemplate(this.film);
  }

  setEmojiesClickHandler() {
    this.getElement()
      .querySelectorAll('.film-details__emoji-label')
      .forEach((element) => {
        element.addEventListener('click', (evt) => {
          const emojiImgHTML = evt.target.outerHTML.replace(/width="\d+" height="\d+"/, 'width="55" height="55"');
          this.getElement().querySelector('.film-details__add-emoji-label').innerHTML = emojiImgHTML;
        });
      });
  }
}
