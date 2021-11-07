import { setUserFormSubmit } from './form.js';
import { setPoints } from './map.js';
import { request } from './api.js';
import { showAlert } from './utilits.js';

const MESSAGE_FAIL_DATA = 'Ошибка загрузки данных Пожалуйста обновите страницу.';

let points = [];

const onSuccess = (data) => {
  points = data.slice();
  setPoints(data);
};
const OnError = () => {
  showAlert(MESSAGE_FAIL_DATA);
};

request(onSuccess, OnError, 'GET');

setUserFormSubmit();

export { points };
