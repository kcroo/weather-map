import { Component, ComponentFactoryResolver, Injector, Input, OnInit } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ForecastFiveDay } from '../models/APIforecastFiveDay.model'
import { ForecastDaily } from '../models/APIforecastDaily.model'
import { LocationForecastComponent } from '../location-forecast/location-forecast.component'
import { featureGroup, tileLayer, latLng, Map, marker, popup, Marker, FeatureGroup } from 'leaflet';
import { I18nSelectPipe } from '@angular/common';


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
  map: Map = null;

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
    //this.openAllPopups();
  }

  initMap() {
    // create marker for each forecast location and create custom popup component containing forecast info
    this.forecasts.forEach(fc => {
      const options = {
        autoClose: false,
        closeOnClick: false,
        maxWidth: 1200,
        maxHeight: 150
      }
      const latLong = latLng([fc.lat, fc.lon]);
      const point = marker(latLong);

      point.bindPopup( () => {
        // create location-forecast-component and set its @Input forecast
        const popupEl: NgElement & WithProperties<LocationForecastComponent> = document.createElement('popup-element') as any;
        popupEl.forecast = fc;

        // Add to the DOM
        document.body.appendChild(popupEl);
        return popupEl;
      }, options);

      // layers group -> auto added to map
      this.layers.push(point);

      // points group -> used for bounds
      this.pointsGroup.addLayer(point);
    });

    // fit to bounds of all markers
    this.bounds = this.pointsGroup.getBounds();
  }

  openAllPopups() {
    setTimeout( () => {
      this.layers.forEach(layer => {
        layer.openPopup();
      });
    }, 200);
  }

  onMapReady(map: Map) {
    this.map = map;
    this.onZoom();
  }

  onZoom() {
    if(this.map) {
      const zoomLevel: number = this.map.getZoom();
      console.log(`zoomLevel: ${zoomLevel}`)
      if (zoomLevel <= 10) {
        this.layers.forEach(layer => {
          layer.closePopup();
        });
      // } else {
      //   this.layers.forEach(layer => {
      //     layer.openPopup();
      //   });
      }
    }
  }
}
