import { setDisabledFields, setDisabledForms } from './form.js';
import './map.js';
import { setData } from './map.js';
import { getData } from './api.js';

window.addEventListener('load', setDisabledFields);
window.addEventListener('load', setDisabledForms);


getData((offers) => {
  setData(offers);
});
