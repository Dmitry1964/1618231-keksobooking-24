const FIRST_ITEM = 0;
const TIME_CHECKIN = [
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

const disabledForm = document.querySelector('.ad-form');
const disabledFormFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('select.map__filter, fieldset');

const setDisabledForms = () => {
  disabledForm.classList.toggle('ad-form--disabled');
  disabledFormFilters.classList.toggle('ad-form--disabled');
};

const setDisabledFields = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const offerType = document.querySelector('#type');
const offerPrice = document.querySelector('#price');

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

///////////////////////////////////////////////////////////////////////
const guestNumber = document.querySelectorAll('#capacity > option');
const roomNumber = document.querySelector('#room_number');


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

const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

const onTimeInChange = () => {
  const index = TIME_CHECKIN.indexOf(timeCheckIn.value);
  timeCheckOut[index].selected = true;
};

const onTimeOutChange = () => {
  const index = TIME_CHECKIN.indexOf(timeCheckOut.value);
  timeCheckIn[index].selected = true;
};

timeCheckIn.addEventListener('change', onTimeInChange);
timeCheckOut.addEventListener('change', onTimeOutChange);

const userForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const fieldTitle = document.querySelector('#title');
const fieldSelect = document.querySelectorAll('select');
const inputPrice = document.querySelector('#price');
const inputDescription = document.querySelector('#description');
const inputCheckbox = document.querySelectorAll('input[type=checkbox]');

const getClearForm = () => {
  fieldTitle.value = '';
  inputPrice.value = '';
  inputPrice.placeholder = minOfferPrice.flat;
  inputDescription.value = '';
  fieldSelect.forEach((element) => {
    const optionItems = element.querySelectorAll('option');
    optionItems[FIRST_ITEM].selected = true;
  });
  inputCheckbox.forEach((element) => {
    element.checked = false;
  });
};

const onResetButtonClick = () => {
  getClearForm();
};

resetButton.addEventListener('click', onResetButtonClick);

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
////////////////////////////////////////////////////////
userForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        showAlertSuccess();
        getClearForm();
      } else {
        showAlertError();
      }
    })
    .catch(() => {
      showAlertError();
    });
});


window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    templateSuccess.remove();
    templateError.remove();
  }
});

window.addEventListener('click', () => {
  templateSuccess.remove();
  templateError.remove();
});

export { setDisabledFields, setDisabledForms, resetButton };
