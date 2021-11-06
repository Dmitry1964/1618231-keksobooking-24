import { setDisabledForms, setDisabledFields } from './form.js';
import { getCardsHousing } from './cards.js';

const DECIMAL_PLACES = 5;
const ZOOM = 12;
const ICON_SIZE = [52, 52];
const ICON_ANCHOR = [26, 52];
const ICON_OFFER_SIZE = [40, 40];
const ICON_OFFER_ANCHOR = [20, 40];
const MAP_ADDRESS = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const downTown = {
  lat: 35.65283,
  lng: 139.83947,
};
const mapAttribution = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const addressOnMap = document.querySelector('#address');

const map = L.map('map-canvas');

L.tileLayer(MAP_ADDRESS,
  { mapAttribution },
).addTo(map);

const iconDefault = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
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


const iconPoint = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: ICON_OFFER_SIZE,
  iconAnchor: ICON_OFFER_ANCHOR,
});

const getPoint = (item) => {
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

const setPoints = (arr) => {
  arr.forEach((element) => {
    getPoint(element);
  });
};

const setMapDefault = () => {
  setMarkerDefault();
  map.setView({
    lat: downTown.lat,
    lng: downTown.lng,
  }, ZOOM);
  map.closePopup();
};

map.on('load', () => {
  setDisabledForms();
  setDisabledFields();
})
  .setView({
    lat: downTown.lat,
    lng: downTown.lng,
  }, ZOOM);


export { map, setPoints, setMapDefault };
