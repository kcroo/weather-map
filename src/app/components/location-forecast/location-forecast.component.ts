import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-forecast',
  templateUrl: './location-forecast.component.html',
  styleUrls: ['./location-forecast.component.css']
})
export class LocationForecastComponent implements OnInit {

  @Input() forecast: Object[];

  constructor() { }

  ngOnInit(): void {
  }

}
