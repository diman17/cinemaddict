import { MAX_LENGTH_OF_DESCRIPTION } from '../const';
import { getRandomArrayItem, getRandomIntegerNumber } from '../utils';

const titles = [
  'The Dance of Life',
  'Made for Each Other',
  'Sagebrush trail',
  'Santa Claus conquers the martians',
  'The great flamarion',
  'The man with the golden arm',
  'Popeye meets Sinbad',
];

const genres = ['Musical', 'Sci-Fi', 'Comedy', 'Thriller', 'Horror', 'Drama', 'Adventure', 'Action', 'Family'];

const srcPosters = [
  './images/posters/the-dance-of-life.jpg',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
  './images/posters/made-for-each-other.png',
];

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateRating = () => {
  const minRating = 0;
  const maxRating = 10;
  return `${(minRating + Math.random() * (maxRating - minRating)).toFixed(1)}`;
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}h ${minutes}m`;
};

const generateDescription = (text) => {
  text = text.split('.');
  const countSentence = getRandomIntegerNumber(1, 5);
  let result = [];
  for (let index = 1; index <= countSentence; index++) {
    result.push(text[getRandomIntegerNumber(0, text.length - 1)]);
  }
  result = result.join('.');
  if (result.length > MAX_LENGTH_OF_DESCRIPTION) {
    return result.slice(0, MAX_LENGTH_OF_DESCRIPTION + 1).replace(/.$/, '...');
  } else {
    result = result.split('');
    result.push('.');
    return result.join('');
  }
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(titles),
    rating: generateRating(),
    year: getRandomIntegerNumber(1924, 2020),
    duration: formatDuration(getRandomIntegerNumber(70, 210)),
    genre: getRandomArrayItem(genres),
    srcPoster: getRandomArrayItem(srcPosters),
    description: generateDescription(description),
    countOfComments: getRandomIntegerNumber(0, 5),
  };
};

export const generateFilms = (count) => {
  return new Array(count).fill('').map(generateFilm);
};
