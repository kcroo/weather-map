import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { ForecastFiveDay } from '../components/models/APIforecastFiveDay.model'
import { ForecastDaily } from '../components/models/APIforecastDaily.model'
import { environment } from 'src/environments/environment';

interface Location {
  lat:number,
  long:number
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  baseUrl: string = 'http://api.openweathermap.org/data/2.5/';
  units: string = 'imperial';
  apiKey: string = environment.weatherKey;
  locations: Location[] = [ {
    lat: 46.071255,
    long: -118.293546
    }, {
      lat: 46.031211, 
      long: -117.908458
    }, {
      lat: 46.313978,
      long: -114.113378
    }, {
      lat: 45.352265, 
      long: -117.229103
    }
  ];
  
  constructor(private _http:HttpClient) { }

  getFiveDayForecast(): Observable<ForecastFiveDay[]> {
    const forecasts: Object[] = [];
    let url: string = null;

    for (const loc of this.locations) {
      url = `forecast?lat=${loc.lat}&lon=${loc.long}&units=${this.units}&appid=${this.apiKey}`;
      forecasts.push(this._http.get(`${this.baseUrl}${url}`));
    }

    return forkJoin(forecasts);
  }

  getDailyForecast(): Observable<ForecastDaily[]> {
    const forecasts: Object[] = [];
    let url: string = null;

    for (const loc of this.locations) {
      url = `onecall?lat=${loc.lat}&lon=${loc.long}&units=${this.units}&exclude=current,minutely,hourly&appid=${this.apiKey}`;
      forecasts.push(this._http.get(`${this.baseUrl}${url}`));
    }

    return forkJoin(forecasts);
  }
}
