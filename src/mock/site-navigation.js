import { getRandomIntegerNumber } from '../utils/common';

export const generateSiteNavigationItems = () => {
  return [
    {
      href: '#all',
      isActive: true,
      name: 'All movies',
      isCountable: false,
    },
    {
      href: '#watchlist',
      isActive: false,
      name: 'Watchlist',
      isCountable: true,
      count: getRandomIntegerNumber(0, 22),
    },
    {
      href: '#history',
      isActive: false,
      name: 'History',
      isCountable: true,
      count: getRandomIntegerNumber(0, 22),
    },
    {
      href: '#favorites',
      isActive: false,
      name: 'Favorites',
      isCountable: true,
      count: getRandomIntegerNumber(0, 22),
    },
  ];
};
