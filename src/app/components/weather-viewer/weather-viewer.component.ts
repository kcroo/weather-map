import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-weather-viewer',
  templateUrl: './weather-viewer.component.html',
  styleUrls: ['./weather-viewer.component.css']
})
export class WeatherViewerComponent implements OnInit {
  weather;
  constructor(private _weatherService:WeatherService) { }

  ngOnInit(): void {
    this._weatherService.getForecast().subscribe(data => {
      this.weather = JSON.stringify(data);
      //this.weather = data;
      console.log(data);
    });
  }

}
