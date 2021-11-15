import { setMapDefault, removeMarkers, onFilterChange } from './map.js';
import { request } from './api.js';
import { isEscape } from './utilits.js';

const FIRST_ITEM = 0;
const TITLE_LENGTH = 30;
const TIMES_CHICKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const minOfferPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const filterFields = mapFilters.querySelectorAll('select.map__filter, fieldset');

const setDisabledForms = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('ad-form--disabled');
};

const setDisabledFields = () => {
  filterFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const offerType = adForm.querySelector('#type');
const offerPrice = adForm.querySelector('#price');

const onOfferTypeChange = () => {
  offerPrice.value = '';
  offerPrice.placeholder = minOfferPrice[offerType.value];
  offerPrice.min = minOfferPrice[offerType.value];
};

offerType.addEventListener('change', onOfferTypeChange);

const onOfferPriceInput = () => {
  let valuePrice = 0;
  valuePrice = offerPrice.value;
  if (valuePrice < parseInt(offerPrice.min, 10)) {
    offerPrice.setCustomValidity(`Минимальная цена ${offerPrice.min}`);
  } else if (valuePrice > parseInt(offerPrice.max, 10)) {
    offerPrice.setCustomValidity(`Цена не должна быть больше${offerPrice.max}`);
  } else {
    offerPrice.setCustomValidity('');
  }
  offerPrice.reportValidity();
};

offerPrice.addEventListener('input', onOfferPriceInput);

const guestNumber = adForm.querySelectorAll('#capacity > option');
const roomNumber = adForm.querySelector('#room_number');


const validateRooms = () => {
  const roomValue = roomNumber.value;
  guestNumber.forEach((guest) => {
    const isDisabled = (numberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = numberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

const onRoomNumberChange = () => {
  validateRooms();
};
roomNumber.addEventListener('change', onRoomNumberChange);

const timeCheckIn = adForm.querySelector('#timein');
const timeCheckOut = adForm.querySelector('#timeout');

const onTimeInChange = () => {
  const index = TIMES_CHICKIN.indexOf(timeCheckIn.value);
  timeCheckOut[index].selected = true;
};

const onTimeOutChange = () => {
  const index = TIMES_CHICKIN.indexOf(timeCheckOut.value);
  timeCheckIn[index].selected = true;
};

timeCheckIn.addEventListener('change', onTimeInChange);
timeCheckOut.addEventListener('change', onTimeOutChange);

const userForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const fieldTitle = adForm.querySelector('#title');
const fieldSelectForm = adForm.querySelectorAll('select');
const fieldSelectFilters = mapFilters.querySelectorAll('select');
const inputPrice = adForm.querySelector('#price');
const inputDescription = adForm.querySelector('#description');
const inputCheckboxFilter = mapFilters.querySelectorAll('input[type=checkbox]');
const inputCheckboxForm = adForm.querySelectorAll('input[type=checkbox]');

const getClearForm = () => {
  fieldTitle.value = '';
  fieldTitle.style.border = '1px solid #d9d9d3';
  inputPrice.value = '';
  inputPrice.style.border = '1px solid #d9d9d3';
  inputPrice.placeholder = minOfferPrice.flat;
  inputDescription.value = '';
  fieldSelectForm.forEach((element) => {
    const optionItems = element.querySelectorAll('option');
    optionItems[FIRST_ITEM].selected = true;
  });
  fieldSelectFilters.forEach((element) => {
    const optionItems = element.querySelectorAll('option');
    optionItems[FIRST_ITEM].selected = true;
  });
  inputCheckboxFilter.forEach((element) => {
    element.checked = false;
  });
  inputCheckboxForm.forEach((element) => {
    element.checked = false;
  });
  setMapDefault();
  removeMarkers();
  onFilterChange();

};

const onResetButtonClick = () => {
  getClearForm();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  onResetButtonClick();
});

const FragmentSuccess = document.querySelector('#success').content;
const FragmentError = document.querySelector('#error').content;
const templateSuccess = FragmentSuccess.querySelector('.success');
const templateError = FragmentError.querySelector('.error');

const showAlertSuccess = () => {
  document.body.appendChild(templateSuccess);
};

const showAlertError = () => {
  document.body.appendChild(templateError);
};

const onAlertEscKeydown = (evt) => {
  if (isEscape(evt)) {
    templateSuccess.remove();
    templateError.remove();
  }
};

const onAlertClick = () => {
  templateSuccess.remove();
  templateError.remove();
};

const setUserFormSubmit = () => {
  const onSuccess = () => {
    showAlertSuccess();
    getClearForm();
  };
  const onError = () => {
    showAlertError();
  };

  const onButtonSubmitClick = () => {
    const titleField = adForm.querySelector('#title');
    const priceField = adForm.querySelector('#price');
    if (titleField.value.length < TITLE_LENGTH) {
      titleField.style.border = '5px solid red';
    } else {
      titleField.style.border = 'none';
    }

    if (priceField.value < parseInt(priceField.min, 10) || priceField.value > parseInt(priceField.max, 10)) {
      priceField.style.border = '5px solid red';
    } else {
      priceField.style.border = 'none';
    }
  };

  const buttonSubmit = adForm.querySelector('.ad-form__submit');

  buttonSubmit.addEventListener('click', () => {
    onButtonSubmitClick();
  });


  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const body = new FormData(evt.target);

    request(onSuccess, onError, 'POST', body);

    document.addEventListener('keydown', onAlertEscKeydown);
    document.addEventListener('click', onAlertClick);
  });
};
export { setDisabledFields, setDisabledForms, setUserFormSubmit };
