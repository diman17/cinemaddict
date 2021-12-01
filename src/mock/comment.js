import { getRandomArrayItem, getRandomIntegerNumber } from '../utils/common';

const srcEmojies = ['./images/emoji/smile.png', './images/emoji/angry.png', './images/emoji/puke.png', './images/emoji/sleeping.png'];
const text = [
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

const generateText = (text) => {
  const countSentence = getRandomIntegerNumber(1, 4);
  const result = new Set();
  while (result.size < countSentence) {
    result.add(text[getRandomIntegerNumber(0, text.length - 1)]);
  }
  return Array.from(result).join(' ');
};

const authors = ['Yash Hughes', 'Owen James', 'Ezekiel Roberts', 'Winifrede Adams', 'Paloma Brown', 'Luciana Hernandez'];

const generateDay = () => {
  return new Date(getRandomIntegerNumber(2018, 2020), getRandomIntegerNumber(0, 11), getRandomIntegerNumber(1, 31), getRandomIntegerNumber(0, 23), getRandomIntegerNumber(0, 59));
};

export const generateComment = () => {
  return {
    id: String(new Date().getTime() + Math.random()),
    srcEmoji: getRandomArrayItem(srcEmojies),
    text: generateText(text),
    author: getRandomArrayItem(authors),
    day: `${generateDay().getFullYear()}/${generateDay().getMonth() + 1}/${generateDay().getDate()} ${generateDay().getHours()}:${generateDay().getMinutes()}`,
  };
};

export const generateComments = (count) => {
  return new Array(count).fill('').map(generateComment);
};
