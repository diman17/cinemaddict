export const getRandomIntegerNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  return array[randomIndex];
};

export const getRandomBoolean = () => Math.random() < 0.5;

export const getFormatDuration = (duration) => {
  const HOUR = 60;
  return `${Math.floor(duration / HOUR)}h ${duration % HOUR}m`;
};
