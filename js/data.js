const OFFER_TITLE = [
  'Милая, уютная квартира в центре Токио',
  'Бунгло на берегу залива',
  'Отель "Калифорния". Вспомним молодость?',
  'Дворец. Семь звезд. Вискас-бар. Дворецкий - Шарик!',
  'Родительский дом - начало начал и  в сердце твоем надежный причал.',
  'Что за дом притих, погружен во мрак? На семи лихих, продувных ветрах.',
  'Если у вас нету дома - пожары ему не страшны!',
  'Комната в "Вороньей слободке", соседи милые люди. Спросить Васисуалия Лоханкина.',
  'Дом, который построил Джек!',
  'Избушка там на курьих ножках стоит без окон, без дверей. Шведский стол.',
];

const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const HOUSING_FEATURE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const HOUSING_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const HOUSING_DESCRIPTION = [
  'Мой дядя самых честных правил, когда не в шутку занемог, он уважать себя заставил и лучше выдумать не смог',
  'Его пример другим наука, но боже мой, какая скука сидеть с больным и день и ночь, не отходить не шагу прочь',
  'Какое низкое коварство полуживого забавлять, ему подушки поправлять, печально подносить лекарство, вздыхать и думать про себя - когда же черт возьмет тебя.',
  'Друзья Людмилы и Руслана, с героем моего романа без промедленья в тот же час позвольте познакомить вас.',
  'Онегин - добрый мой приятель, родился на брегах Невы, где может быть родились вы или блистали, мой читатель. Там некогда гулял и я, но вреден север для меня.',
  'Судьба Онегина хранила, сперва мадам за ни ходила, потом мёсье ее сменил, ребенок был резов, но мил.',
  'Мёсье эль Аббе - француз убогой, что б не измучилось дитя, учил его всему шутя. Не докучал моралью строго, слегка за шалости бранил и в летний сад гулять водил.',
  'Когда же юности мятежной пришла Онегину пора, пора надежд и грусти нежной, мёсье прогнали со двора.',
  'Вот мой Онегин на свободе, острижен по последней моде, как денди лондонский одет - и наконец увидел свет',
  'Он по-французски совершеннно мог изъясняться и писал, легко мазурку танцевал и кланялся непринужденно. Чего ж вам больше? Свет решил, что он умен и очень мил',
];

const LOCATION_LAT = [35.65, 35.7, 5];

const LOCATION_LNG = [139.7, 139.8, 5];

const price = {
  MIN: 0,
  MAX: 1000000,
};

const rooms = {
  MIN: 1,
  MAX: 10,
};

const quests = {
  MIN: 1,
  MAX: 10,
};

const BASE_HOUSING_COUNT = 10;


const getRandomInt = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomVar = (min, max, decimalPlaces) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  const number = Math.random() * (max - min) + min;
  return number.toFixed(decimalPlaces);
};


const getArrayElements = (elements) => {
  const  getElement = () => {
    const index = getRandomInt(0, elements.length - 1);
    return elements[index];
  };
  const arrayLen = getRandomInt(1, elements.length);
  const ArrayElements = Array.from({length: arrayLen}, getElement);
  return [...new Set(ArrayElements)];
};

// функция возвращает  случайный элемент массива
const getRandomElement = (elements) => elements[getRandomInt(0, elements.length-1)];

const getAuthorHousing = (index) => {
  index = index + 1;
  return { avatar: `img/avatars/user${(index <= 9) ? `0${  index}` : index  }.png`};
};

const getLocationHousing = () => ({
  lat: getRandomVar(...LOCATION_LAT),
  lng: getRandomVar(...LOCATION_LNG),
});

const getOfferHousing = () => ({
  title: getRandomElement(OFFER_TITLE),
  address: `${getRandomVar(...LOCATION_LAT)  },${  getRandomVar(...LOCATION_LNG)}`,
  price: getRandomInt(price.MIN, price.MAX),
  type: getRandomElement(HOUSING_TYPE),
  rooms: getRandomInt(rooms.MIN, rooms.MAX),
  quests: getRandomInt(quests.MIN, quests.MAX),
  checkin: getRandomElement(TIME_CHECKIN),
  checkout: getRandomElement(TIME_CHECKIN),
  features: getArrayElements(HOUSING_FEATURE),
  description: getRandomElement(HOUSING_DESCRIPTION) ,
  photos: getArrayElements(HOUSING_PHOTOS),
});

const baseHousings = [];
for (let i = 0; i <= BASE_HOUSING_COUNT - 1; i++) {
  baseHousings.push({
    author: getAuthorHousing(i),
    offer: getOfferHousing(),
    location: getLocationHousing(),
  });
}

export {baseHousings};
