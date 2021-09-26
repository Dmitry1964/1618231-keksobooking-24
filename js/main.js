
// Функции - генераторы случайных чисел
// Источник - https://developer.mozilla.org

function getRandomInt(min, max) {
  if (min >= max || min < 0) {
    return 'Минимальное значение диапазона не может быть отрицательным, больше или равняться максимальному';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomInt(2.2, 100.5);

function getRandomVar(min, max, decimalPlaces) {
  if (min >= max || min < 0) {
    return 'Минимальное значение диапазона не может быть отрицательным, больше или равняться максимальному';
  }
  const number = Math.random() * (max - min) + min;
  return number.toFixed(decimalPlaces);
}

getRandomVar(20, 100.25, 2);
