import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MarkerComponent } from './marker/marker.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NavItemComponent,
    MapComponent,
    MarkerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6ptPv5Nl8UksFWczSmloxpjuKXzD_7-M'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
