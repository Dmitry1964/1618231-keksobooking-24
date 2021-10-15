import {baseHousings as offers} from './data.js';


const mapCanvas = document.querySelector('.map__canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();

//определяем тип жилья

const getTypeHousing = (index) => {
  const typeOffer = offers[index].offer.type;
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
    const target = featureModList.some((featureModItem) => featuresItem.classList.contains(`popup__feature--${  featureModItem}`),
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


for ( let i = 0; i < offers.length; i++) {
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

  (offers[i].author.avatar) ? avatarPopup.src = offers[i].author.avatar : avatarPopup.classList.add('hidden');
  (offers[i].offer.title) ? titlePopup.textContent = offers[i].offer.title : titlePopup.classList.add('hidden');
  (offers[i].offer.address) ? addressPopup.textContent = offers[i].offer.address : addressPopup.classList.add('hidden');
  (offers[i].offer.price) ? pricePopup.textContent = `${offers[i].offer.price  } ₽/ночь` : pricePopup.classList.add('hidden');
  typePopup.textContent = getTypeHousing(i);
  capacityPopup.textContent = `${offers[i].offer.rooms  } комнат для ${  offers[i].offer.quests  } гостей`;
  timePopup.textContent = `Заезд после ${  offers[i].offer.checkin  } , выезд до${  offers[i].offer.checkout}`;

  (offers[i].offer.features.length !== 0) ? getFeaturesPopup(i, featuresList) : featuresList.classList.add('hidden');
  (offers[i].offer.description) ? descriptionPopup.textContent = offers[i].offer.description : descriptionPopup.classList.add('hidden');
  (offers[i].offer.photos.length !== 0) ? getPhotosPopup(i, photosPopupList) : photosPopupList.classList.add('hidden');

  fragment.appendChild(element);
}
mapCanvas.appendChild(fragment.children[5]);

export {mapCanvas};
