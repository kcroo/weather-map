import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherViewerComponent } from './components/weather-viewer/weather-viewer.component';
import { LocationForecastComponent } from './components/location-forecast/location-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherViewerComponent,
    LocationForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
