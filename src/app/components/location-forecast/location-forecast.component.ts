import { Component, Input, OnInit } from '@angular/core';

interface forecastAPIFormat {
  cod?: string;
  message?: number;
  cnt?: number;
  // make another interface for rest of it to
  // https://stackoverflow.com/questions/50541000/typescript-how-to-create-nested-interface-for-json-object
}

@Component({
  selector: 'app-location-forecast',
  templateUrl: './location-forecast.component.html',
  styleUrls: ['./location-forecast.component.css']
})
export class LocationForecastComponent implements OnInit {

  @Input() forecast: forecastAPIFormat;

  constructor() { }

  ngOnInit(): void {
  }

}
