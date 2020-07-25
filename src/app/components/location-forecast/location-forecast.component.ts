import { Component, Input, OnInit } from '@angular/core';
import { ForecastFiveDay } from '../models/forecastFiveDay.model'

@Component({
  selector: 'app-location-forecast',
  templateUrl: './location-forecast.component.html',
  styleUrls: ['./location-forecast.component.css']
})
export class LocationForecastComponent implements OnInit {

  @Input() forecast: ForecastFiveDay;

  constructor() { }

  ngOnInit(): void {
  }

}
