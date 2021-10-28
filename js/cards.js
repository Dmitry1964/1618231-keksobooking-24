import { baseHousings as offers } from './data.js';
import { numDecline } from './utilits.js';

const mapCanvas = document.querySelector('.map__canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();

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

const getFeaturesPopup = (index, listElement) => {
  const featuresItems = listElement.querySelectorAll('.popup__feature');
  const featureModList = offers[index].offer.features;
  featuresItems.forEach((featuresItem) => {
    const target = featureModList.some((featureModItem) => featuresItem.classList.contains(`popup__feature--${featureModItem}`),
    );
    if (!target) {
      featuresItem.remove();
    }
  });
  return featuresItems;
};

const getPhotosPopup = (index, listPhotos) => {
  const photosList = offers[index].offer.photos;
  listPhotos.innerHTML = '';
  photosList.forEach((photosItem) => {
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
  const { title, address, price, type, rooms, quests, checkin, checkout, features, description, photos } = arr.offer;
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

  (avatar) ? avatarPopup.src = arr.author.avatar : avatarPopup.classList.add('hidden');
  (title) ? titlePopup.textContent = title : titlePopup.classList.add('hidden');
  (address) ? addressPopup.textContent = address : addressPopup.classList.add('hidden');
  (price) ? pricePopup.textContent = `${price} ₽/ночь` : pricePopup.classList.add('hidden');
  (type) ? typePopup.textContent = getTypeHousing(type) : typePopup.classList.add('hidden');
  (!rooms || !quests) ?
    capacityPopup.classList.add('hidden') :
    capacityPopup.textContent = `${rooms} ${numDecline(rooms, 'комната', 'комнаты', 'комнат')} для ${`${quests} ${numDecline(quests, 'гостя', 'гостей', 'гостей')}`} `;
  (!checkin || !checkout) ?
    timePopup.classList.add('hidden') :
    timePopup.textContent = `Заезд после ${checkin} , выезд до${checkout}`;
  (features.length !== 0) ? getFeaturesPopup(0, featuresList) : featuresList.classList.add('hidden');
  (description) ? descriptionPopup.textContent = description : descriptionPopup.classList.add('hidden');
  (photos.length !== 0) ? getPhotosPopup(0, photosPopupList) : photosPopupList.classList.add('hidden');
  return element;
};

mapCanvas.appendChild(fragment);
export { getCardsHousing };
