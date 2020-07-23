import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-weather-viewer',
  templateUrl: './weather-viewer.component.html',
  styleUrls: ['./weather-viewer.component.css']
})
export class WeatherViewerComponent implements OnInit {
  forecasts: Object[];
  constructor(private _weatherService:WeatherService) { }

  ngOnInit(): void {
    this._weatherService.getForecast().subscribe(data => {
      this.forecasts = data;
      //this.weather = data;
      console.log(data);
    });
  }

}
