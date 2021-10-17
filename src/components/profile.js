export const createProfileTemplate = (profile) => {
  const { rating, srcAvatar } = profile;
  return `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="${srcAvatar}" alt="Avatar" width="35" height="35">
    </section>`;
};
