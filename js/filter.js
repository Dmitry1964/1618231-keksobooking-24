import { MAX_OFFERS } from './map.js';

const DEFAULT_VALUE = 'any';
const priceMap = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,

  'housing-price': (data, filter) => data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end,

  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),

  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),

  'housing-features': (data, filter) => {
    const checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

    return checkListElements.every((checkbox) => {
      if (!data.offer.features) {
        return false;
      } else {
        return data.offer.features.some((feature) => checkbox.value === feature);
      }
    });
  },
};

const filterData = (data) => {
  const filteredOffers = [];
  let i = 0;
  let result;

  while (i < data.length && filteredOffers.length < MAX_OFFERS) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : filterRules[filter.id](data[i], filter));

    if (result) {
      filteredOffers.push(data[i]);
    }

    i++;
  }

  return filteredOffers;
};

export { filterData };
