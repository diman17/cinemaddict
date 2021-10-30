export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  return array[randomIndex];
};

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstChild;
};

export const render = (container, element, renderPosition = 'append') => {
  switch (renderPosition) {
    case 'append':
      container.append(element);
      break;
    case 'prepend':
      container.prepend(element);
      break;
    case 'before':
      container.before(element);
      break;
    case 'after':
      container.after(element);
      break;
  }
};
