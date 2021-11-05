import { showAlert } from './utilits.js';


const MESSAGE_FAIL_DATA = 'Ошибка загрузки данных Пожалуйста обновите страницу.';
const addressSite = {
  load: 'https://24.javascript.pages.academy/keksobooking/data',
  send: ' https://24.javascript.pages.academy/keksobooking',
};


const getData = (onSuccess) => {
  fetch(addressSite.load)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert(MESSAGE_FAIL_DATA);
    });
};

export { getData };

