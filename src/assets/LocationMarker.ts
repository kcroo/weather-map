import * as L from 'leaflet';

const blueIcon: L.Icon = new L.Icon({
    name: 'blueIcon',
    iconUrl: 'assets/markers/marker-icon-blue.png',
    shadowUrl: 'assets/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const redIcon: L.Icon = new L.Icon({
    name: 'redIcon',
    iconUrl: 'assets/markers/marker-icon-red.png',
    shadowUrl: 'assets/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export class LocationMarker extends L.Marker {
  isActive: boolean;

  constructor(latLng: L.LatLngExpression) {
    super(latLng, {
        icon: blueIcon
    });
    this.isActive = false;
  }

  setActive() {
    this.isActive = true;
    this.setIcon(redIcon);
  }

  setInactive() {
    this.isActive = false;
    this.setIcon(blueIcon);
  }

  switchActive() {
    this.isActive = !this.isActive;
  }
}
