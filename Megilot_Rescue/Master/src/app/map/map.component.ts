import { Component, OnInit } from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral} from 'angular2-google-maps/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'My first angular2-google-maps project';
  lat: number = 31.7683;
  lng: number = 35.2137;
  paths: Array<LatLngLiteral> = [
    { lat: 0,  lng: 31.7683 },
    { lat: 0,  lng: 35.2137 },
    { lat: 31.7683, lng: 35.2137 },
    { lat: 31.7683, lng: 31.7683 },
    { lat: 0,  lng: 31.7683 }
  ]
  // Nesting paths will create a hole where they overlap;
  nestedPaths:Array<Array<LatLngLiteral>> =[[
    { lat: 0,  lng: 10 },
    { lat: 0,  lng: 20 },
    { lat: 10, lng: 20 },
    { lat: 10, lng: 10 },
    { lat: 0,  lng: 10 }
  ], [
    { lat: 0, lng: 15 },
    { lat: 0, lng: 20 },
    { lat: 5, lng: 20 },
    { lat: 5, lng: 15 },
    { lat: 0, lng: 15 }
  ]]
  constructor() { }
  
  ngOnInit() {
  }

}
