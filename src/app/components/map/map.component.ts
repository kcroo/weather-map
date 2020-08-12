import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, OnInit } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ForecastFiveDay } from '../models/APIforecastFiveDay.model'
import { ForecastDaily } from '../models/APIforecastDaily.model'
import { LocationForecastComponent } from '../location-forecast/location-forecast.component'
//import { featureGroup, tileLayer, latLng, Map, marker, popup, Marker, FeatureGroup } from 'leaflet';
import { I18nSelectPipe } from '@angular/common';
import * as L from 'leaflet';
import { LocationMarker } from '../../../assets/LocationMarker'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() forecasts: ForecastDaily[];
  forecast: ForecastDaily = null;
  options: Object;
  layers: L.Marker[] = [];
  pointsGroup: L.FeatureGroup = L.featureGroup();
  bounds = null;
  map: L.Map = null;


  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _leaflet: LeafletModule,
    private _changeDetector: ChangeDetectorRef ) { }
    

  ngOnInit(): void {
    this.initMap();
    this.options = {
      layers: [L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })],
      zoom: 5
    };
  }

  initMap() {
    // create marker for each forecast location and create custom popup component containing forecast info
    // all markers start as blue
    this.forecasts.forEach(fc => {
      const latLong = L.latLng([fc.lat, fc.lon]);
      const point = new LocationMarker(latLong);

      // on marker click, must update forecast
      // need to bind 'this', so that it refers to the angular MapComponent and not the leaflet click event
      // also allows passing the forecast object to the onClick function
      // similar to this: https://stackoverflow.com/questions/36234236/add-parameters-to-onclick-function     
      point.on('click', this.setForecast.bind(this, fc));

      // on marker click, also change marker to red
      point.on('click', event => {
        event.target.setActive();
      });

      // layers group -> auto added to map
      this.layers.push(point);

      // points group -> used for bounds
      this.pointsGroup.addLayer(point);
    });

    // fit to bounds of all markers
    this.bounds = this.pointsGroup.getBounds();
  }

  // when marker is clicked, want to change the active forecast and tell angular that something has changed
  // changes that happen in leaflet are not auto-detected by angular -> must manually detect changes in this component and its children
  // see 'Manually Triggering Change Detection' here: https://github.com/Asymmetrik/ngx-leaflet
  setForecast(fc) {
    this.forecast = fc;
    this._changeDetector.detectChanges();
  }

  openAllPopups() {
    setTimeout( () => {
      this.layers.forEach(layer => {
        layer.openPopup();
      });
    }, 200);
  }

  onMapReady(map: L.Map) {
    this.map = map;
    //this.initMap();
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
      }
    }
  }

}
