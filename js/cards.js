import { numDecline } from './utilits.js';
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');

const getTypeHousing = (typeOffer) => {
  if (typeOffer === 'flat') {
    return 'Квартира';
  } else if (typeOffer === 'bungalow') {
    return 'Бунгало';
  } else if (typeOffer === 'house') {
    return 'Дом';
  } else if (typeOffer === 'palace') {
    return 'Дворец';
  }
  return 'Отель';
};

const getFeaturesPopup = (features, listElement) => {
  const featuresItems = listElement.querySelectorAll('.popup__feature');
  featuresItems.forEach((featuresItem) => {
    const target = features.some((featureModItem) => featuresItem.classList.contains(`popup__feature--${featureModItem}`),
    );
    if (!target) {
      featuresItem.remove();
    }
  });
  return featuresItems;
};

const getPhotosPopup = (photos, listPhotos) => {
  listPhotos.innerHTML = '';
  photos.forEach((photosItem) => {
    const photosPopupItem = document.createElement('img');
    photosPopupItem.src = photosItem;
    photosPopupItem.width = '45';
    photosPopupItem.height = '45';
    photosPopupItem.alt = 'Фотография жилья';
    photosPopupItem.classList.add('popup__photo');
    listPhotos.appendChild(photosPopupItem);
  });
};

const getCardsHousing = (arr) => {
  const { avatar } = arr.author;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = arr.offer;
  const element = template.cloneNode(true);
  const avatarPopup = element.querySelector('.popup__avatar');
  const titlePopup = element.querySelector('.popup__title');
  const addressPopup = element.querySelector('.popup__text--address');
  const pricePopup = element.querySelector('.popup__text--price');
  const typePopup = element.querySelector('.popup__type');
  const capacityPopup = element.querySelector('.popup__text--capacity');
  const timePopup = element.querySelector('.popup__text--time');
  const featuresList = element.querySelector('.popup__features');
  const descriptionPopup = element.querySelector('.popup__description');
  const photosPopupList = element.querySelector('.popup__photos');

  if (avatar) {
    avatarPopup.src = arr.author.avatar;
  } else { avatarPopup.remove(); }

  if (title) {
    titlePopup.textContent = title;
  } else { titlePopup.remove(); }

  if (address) {
    addressPopup.textContent = address;
  } else { addressPopup.remove(); }

  if (price) {
    pricePopup.textContent = `${price} ₽/ночь`;
  } else { pricePopup.remove(); }

  if (type) {
    typePopup.textContent = getTypeHousing(type);
  } else { typePopup.remove(); }

  if (!rooms || !guests) {
    capacityPopup.remove();
  } else {
    capacityPopup.textContent = `${rooms} ${numDecline(rooms, 'комната', 'комнаты', 'комнат')} для ${`${guests}
   ${numDecline(guests, 'гостя', 'гостей', 'гостей')}`} `;
  }

  if (!checkin || !checkout) {
    timePopup.remove();
  } else {
    timePopup.textContent = `Заезд после ${checkin} , выезд до${checkout}`;
  }

  if (features) {
    getFeaturesPopup(features, featuresList);
  } else { featuresList.remove(); }

  if (description) {
    descriptionPopup.textContent = description;
  } else { descriptionPopup.remove(); }

  if (photos) {
    getPhotosPopup(photos, photosPopupList);
  } else { photosPopupList.remove(); }
  return element;
};

export { getCardsHousing };
