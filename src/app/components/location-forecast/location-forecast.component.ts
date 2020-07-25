import { Component, Input, OnInit } from '@angular/core';
import { ForecastFiveDay } from '../models/APIforecastFiveDay.model'
import { ForecastDaily } from '../models/APIforecastDaily.model'

@Component({
  selector: 'app-location-forecast',
  templateUrl: './location-forecast.component.html',
  styleUrls: ['./location-forecast.component.css']
})
export class LocationForecastComponent implements OnInit {

  //@Input() forecast: ForecastFiveDay;
  @Input() forecast: ForecastDaily;

  constructor() { }

  ngOnInit(): void {
  }

  getMonthAndDate(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    return `${date.getMonth()}/${date.getDate()}`
  }

  roundNumber(num: number) {
    return Math.round(num);
  }

}
