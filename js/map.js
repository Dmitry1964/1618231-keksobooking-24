import { getCardsHousing } from './cards.js';
import { request } from './api.js';
import { showAlert } from './utilits.js';
import { filterData } from './filter.js';
import { toggleSwitch } from './main.js';
import { debounce } from './utils/debounce.js';

const MAX_OFFERS = 10;
const MESSAGE_FAIL_DATA = 'Ошибка загрузки данных Пожалуйста обновите страницу.';
const DECIMAL_PLACES = 5;
const ZOOM = 12;
const TIME_OUT = 500;
const ICON_SIZIES = [52, 52];
const ICON_ANCHOR_SIZIES = [26, 52];
const ICON_OFFER_SIZES = [40, 40];
const ICON_OFFER_ANCHOR_SIZIES = [20, 40];
const MAP_ADDRESS = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let points = [];
const downTown = {
  lat: 35.65283,
  lng: 139.83947,
};
const mapAttribution = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const addressOnMap = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

const map = L.map('map-canvas');


L.tileLayer(MAP_ADDRESS,
  { mapAttribution },
).addTo(map);

const iconDefault = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: ICON_SIZIES,
  iconAnchor: ICON_ANCHOR_SIZIES,
});

const markerDefault = L.marker(
  {
    lat: downTown.lat,
    lng: downTown.lng,
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

const setMarkerDefault = () => {
  markerDefault.setLatLng({
    lat: downTown.lat,
    lng: downTown.lng,
  });
  addressOnMap.value = `${markerDefault._latlng.lat}, ${markerDefault._latlng.lng}`;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (item) => {
  const iconPoint = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: ICON_OFFER_SIZES,
    iconAnchor: ICON_OFFER_ANCHOR_SIZIES,
  });

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
    .addTo(markerGroup)
    .bindPopup(getCardsHousing(item));
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};

const setPoints = (arr) => {
  arr.forEach((element) => {
    createMarker(element);
  });
};

const onFilterChange = debounce(() => {
  removeMarkers();
  setPoints(filterData(points)), TIME_OUT;
});

mapFilters.addEventListener('change', onFilterChange);

const onSuccess = (data) => {
  toggleSwitch();
  points = data.slice();
  setPoints(points.slice(0, MAX_OFFERS));
};

const OnError = () => {
  showAlert(MESSAGE_FAIL_DATA);
};

map.on('load', () => {
  request(onSuccess, OnError, 'GET');
})
  .setView({
    lat: downTown.lat,
    lng: downTown.lng,
  }, ZOOM);

const setMapDefault = () => {
  setMarkerDefault();
  map.setView({
    lat: downTown.lat,
    lng: downTown.lng,
  }, ZOOM);
  map.closePopup();
};
export { map, setPoints, setMapDefault, MAX_OFFERS, removeMarkers, onFilterChange };
