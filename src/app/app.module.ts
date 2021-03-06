import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherViewerComponent } from './components/weather-viewer/weather-viewer.component';
import { LocationForecastComponent } from './components/location-forecast/location-forecast.component';
import { MapComponent } from './components/map/map.component';

/* reference for dynamic custom component in leaflet map popup: https://github.com/Asymmetrik/ngx-leaflet/issues/178
*/

@NgModule({
  declarations: [
    AppComponent,
    WeatherViewerComponent,
    LocationForecastComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LeafletModule
  ],
  // dynamic component for forecast popup on map
  entryComponents: [
    LocationForecastComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // register custom popup element with browser for forecast popup on map
    const PopupElement = createCustomElement(LocationForecastComponent, {injector});
    customElements.define('popup-element', PopupElement);
  }
 }
