import { setDisabledForms, setDisabledFields } from './form.js';
import { baseHousings as offers } from './data.js';
import { getCardsHousing } from './cards.js';

const DECIMAL_PLACES = 5;
const addressOnMap = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: 35.65283,
    lng: 139.83947,
  }, 12);

// map.on('load', () => {
//   setDisabledFields();
//   setDisabledForms();
// });

setDisabledFields();
setDisabledForms();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const iconDefault = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerDefault = L.marker(
  {
    lat: 35.65283,
    lng: 139.83947,
  },
  {
    draggable: true,
    icon: iconDefault,
  },
);

markerDefault.addTo(map);

addressOnMap.value = `${markerDefault._latlng.lat}, ${markerDefault._latlng.lng}`;

const getAddressOnMap = (address) => {
  addressOnMap.value = `${address.lat.toFixed(DECIMAL_PLACES)}, ${address.lng.toFixed(DECIMAL_PLACES)}`;
};

markerDefault.on('moveend', (evt) => {
  getAddressOnMap(evt.target.getLatLng());
});

map.on('click', () => {
  markerDefault.setLatLng({
    lat: 35.65283,
    lng: 139.83947,
  });
  addressOnMap.value = `${markerDefault._latlng.lat}, ${markerDefault._latlng.lng}`;
});

const iconPoint = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getPoints = (item) => {
  const marker = L.marker(
    {
      lat: item.location.lat,
      lng: item.location.lng,
    },
    {
      icon: iconPoint,
    },
  );
  marker
    .addTo(map)
    .bindPopup(getCardsHousing(item));
};

offers.forEach((element) => {
  getPoints(element);
});
export { map };
