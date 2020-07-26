import { Component, Input, OnInit } from '@angular/core';
import { ForecastFiveDay } from '../models/APIforecastFiveDay.model'
import { ForecastDaily } from '../models/APIforecastDaily.model'
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() forecasts: ForecastDaily[];
  isUndefined: boolean;
  map;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map');
    const pointsLayer = L.featureGroup();

    this.forecasts.forEach(fc => {
      const latLong = L.latLng([fc.lat, fc.lon]);
      const point = L.marker(latLong)
        .bindPopup(`${fc.lat},${fc.lon}`)
        .addTo(this.map);
      pointsLayer.addLayer(point);
    });

    this.map.fitBounds(pointsLayer.getBounds());

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
