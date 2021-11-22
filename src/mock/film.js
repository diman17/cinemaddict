import { getRandomArrayItem, getRandomBoolean, getRandomIntegerNumber } from '../utils/common';
import { generateComments } from './comment';

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

const description = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
  ['Cras aliquet varius magna, non porta ligula feugiat eget.'],
  ['Fusce tristique felis at fermentum pharetra.'],
  ['Aliquam id orci ut lectus varius viverra.'],
  ['Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'],
  ['Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.'],
  ['Aliquam erat volutpat.'],
  ['Nunc fermentum tortor ac porta dapibus.'],
  ['In rutrum ac purus sit amet tempus.'],
];

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
  const countSentence = getRandomIntegerNumber(1, 5);
  let description = new Set();
  while (description.size < countSentence) {
    description.add(text[getRandomIntegerNumber(0, text.length - 1)]);
  }
  return Array.from(description).join(' ');
};

const filmAges = ['0+', '6+', '12+', '16+', '18+'];

const directors = ['Anthony Mann', 'Quentin Tarantino', 'James Cameron', 'Christopher Nolan', 'Niklaus Torres', 'Braxton Powell', 'Adriel Peterson'];

const writters = [
  ['Alejandro Bennett', 'Quintana Sanchez', 'Remington Ross'],
  ['Silas Howard', 'Layla Barnes', 'Raphael Taylor'],
  ['Raphael Davis', 'Zeppelin Thomas', 'Ishmael Moore'],
  ['Alexa Price', 'Tenley Jenkins', 'Vann Coleman'],
  ['Karter Harris', 'Briar Howard', 'Donald Butler'],
  ['Seth Roberts', 'Maverick Williams', 'Zack James'],
  ['Marcus Baker', 'Zackery Martinez', 'Fabiola Cox'],
];

const actors = [
  ['Gage Sanchez', 'Jayla Watson', 'Reyna Allen'],
  ['Phoebe Butler', 'Franklin Moore', 'Lexi Coleman'],
  ['Noa Price', 'Jazlyn Martin', 'Ulyssa Griffin'],
  ['Stefan Perez', 'Austin Ross', 'Madilyn Price'],
  ['Urina Gray', 'Zayne Nelson', 'Valencia Smith'],
  ['Grace Perez', 'Haylie Cooper', 'Nyla Gray'],
  ['Brooklynn Stewart', 'Rosa Wood', 'Colby Smith'],
];

const generateDate = () => {
  return new Date(getRandomIntegerNumber(1924, 2020), getRandomIntegerNumber(0, 11), getRandomIntegerNumber(1, 31));
};

export const generateFilm = () => {
  const comments = generateComments(getRandomIntegerNumber(1, 9));
  return {
    title: getRandomArrayItem(titles),
    age: getRandomArrayItem(filmAges),
    rating: generateRating(),
    director: getRandomArrayItem(directors),
    writters: getRandomArrayItem(writters),
    actors: getRandomArrayItem(actors),
    date: generateDate(),
    country: 'USA',
    duration: formatDuration(getRandomIntegerNumber(70, 210)),
    genre: getRandomArrayItem(genres),
    srcPoster: getRandomArrayItem(srcPosters),
    description: generateDescription(description),
    comments: comments,
    countComments: comments.length,
    isWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

export const TOTAL_FILMS = getRandomIntegerNumber(0, 31);

export const generateFilms = (count) => {
  return new Array(count).fill('').map(generateFilm);
};
