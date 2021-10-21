const MinOfferPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const offerTitle = document.querySelector('#title');
const minTitleLength = parseInt(offerTitle.attributes.minlength.value, 10);
const maxTitleLength = parseInt(offerTitle.attributes.maxlength.value, 10);

offerTitle.addEventListener('input', () => {
  const valueLength = offerTitle.value.length;
  if ( valueLength < minTitleLength) {
    offerTitle.setCustomValidity(`Еще ${  minTitleLength - valueLength  } симв.`);
  } else if( valueLength === maxTitleLength) {
    offerTitle.setCustomValidity('Вы ввели максимальное допустимое количество знаков');
  } else {
    offerTitle.setCustomValidity('');
  }
  offerTitle.reportValidity();
});

////////////////////////////////////////////////////////////
const getMinPrice = (key) => MinOfferPrice[key];

const offerType = document.querySelector('#type');
const offerPrice = document.querySelector('#price');
const maxPriceValue = parseInt(offerPrice.attributes.max.value, 10);

offerType.addEventListener('change', () => {
  offerPrice.value = '';
  offerPrice.attributes.placeholder.value = getMinPrice(offerType.value);
});

offerPrice.addEventListener('change', () => {
  let valuePrice = 0;
  valuePrice = offerPrice.value;
  const minValuePrice = parseInt(getMinPrice(offerType.value), 10);
  if (valuePrice < minValuePrice) {
    offerPrice.setCustomValidity(`Минимальная цена ${  minValuePrice}`);
  } else if (valuePrice > maxPriceValue) {
    offerPrice.setCustomValidity(`Цена не должна быть больше${  maxPriceValue}`);
  } else {
    offerPrice.setCustomValidity('');
  }
  offerPrice.reportValidity();
});

///////////////////////////////////////////////////////////////////////
const offerCapacity = document.querySelectorAll('#capacity > option');
const offerRooms = document.querySelector('#room_number');

const getCapacityList = (rooms) => {
  offerCapacity.forEach ((element) => {
    element.disabled = false;
    if(rooms < parseInt(element.value, 10)) {
      element.disabled = true;
    }
    if (element.value === '0') {
      element.disabled = true;
    }
  });
};

const getCapacity = () => {
  offerCapacity.forEach((element) => {
    element.disabled = true;
    if (element.value === '0') {
      element.disabled = false;
    }
  });
};

offerRooms.addEventListener('click', () => {
  const roomsValue = parseInt(offerRooms.value, 10);
  if (roomsValue === 100) {
    getCapacity();
  } else {getCapacityList(roomsValue);}
});

export {offerTitle};
