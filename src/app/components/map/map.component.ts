import { Component, ComponentFactoryResolver, Injector, Input, OnInit } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ForecastFiveDay } from '../models/APIforecastFiveDay.model'
import { ForecastDaily } from '../models/APIforecastDaily.model'
import { LocationForecastComponent } from '../location-forecast/location-forecast.component'
import { featureGroup, tileLayer, latLng, marker, popup, Marker, FeatureGroup } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() forecasts: ForecastDaily[];
  options: Object;
  layers: Marker[] = [];
  pointsGroup: FeatureGroup = featureGroup();
  bounds = null;

  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _leaflet: LeafletModule ) { }
    

  ngOnInit(): void {
    this.options = {
      layers: [tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })],
      zoom: 5
    };

    this.initMap();
  }

  initMap() {
    // create marker for each forecast location
    this.forecasts.forEach(fc => {

      const latLong = latLng([fc.lat, fc.lon]);
      const point = marker(latLong)
        .bindPopup(popup => {
          // create location-forecast-component and set its @Input forecast
          const popupEl: NgElement & WithProperties<LocationForecastComponent> = document.createElement('popup-element') as any;
          popupEl.forecast = fc;

          // Listen to the close event
          popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

          // Add to the DOM
          document.body.appendChild(popupEl);
          return popupEl;
        }, {closeOnClick: false, autoClose: false});

      // layers group -> auto added to map
      this.layers.push(point);

      // points group -> used for bounds
      this.pointsGroup.addLayer(point);
    });

    // fit to bounds of all markers
    this.bounds = this.pointsGroup.getBounds();
  }
}
