
// Функции - генераторы случайных чисел
// Источник - https://developer.mozilla.org

const getRandomInt = (min, max) => {
  if (min >= max || min < 0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt();

const getRandomVar = (min, max, decimalPlaces) => {
  if (min >= max || min < 0) {
    return -1;
  }
  const number = Math.random() * (max - min) + min;
  return number.toFixed(decimalPlaces);
};

getRandomVar();
