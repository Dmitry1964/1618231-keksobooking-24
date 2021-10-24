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

const disabledFields = document.querySelectorAll('select.map__filter, fieldset');

const setDisabledFields = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

setDisabledFields();

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
  console.log(roomValue);
  guestNumber.forEach((guest) => {
    // в зависимости от количества комнат получаем нужный массив строк из объекта numberOfGuests
    //с помощью метода indexOf смотрим, есть ли в этом массиве элемен равный значению value из option в переменной guestNumber
    //если есть, то метод возвращает нам индекс элемента. он не равен -1, поэтому получаем булево false
    // если элемента нет метод возвращает -1, булево true. Дальше присваиваем атрибутам disabled и hidden полученные булево.
    const isDisabled = (numberOfGuests[roomValue].indexOf(guest.value) === -1);
    // здесь делам так, чтобы option, у которого value равен первому елементу в массиве строк, имел атрибут selected = true;
    guest.selected = numberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();
const onRoomNumberChange = () => {
  validateRooms();
};
roomNumber.addEventListener('change', onRoomNumberChange);

export { offerPrice };
