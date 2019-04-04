import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAnimalsComponent } from '../form-animals/form-animals.component';
import { SppInfoComponent } from '../map/spp-info/spp-info.component';
import { ReproductionPlacesInfoComponent } from '../map/reproduction-places-info/reproduction-places-info.component';



@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
})
export class MapBoxComponent implements OnInit {

  mapOptions = {
    tunaMigration: false,
    whaleMigration: false,
    turtleMigration: false,
    tuna: false,
    whale: false,
    turtle: false,
    mySpecies: false,
    individuals: false,
    reproductionPlaces: false
  };

  playing = false;

  markerRoute = false;

  markerRouteData = {
    longitude: null,
    latitude: null,
    class: null
  };

  interval = null;
  coordinates = null;
  coordinatesPosition = null;
  id = "hola"

  routeTurtleSource = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-13.522967, 29.262608],
          [-16.559402, 32.506429],
          [-26.601249, 38.569670],
          [-28.291182, 37.591364],
        ]
      }
    }
  };

  routeWhaleSource = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-9.368543, 42.207046],
          [-9.332207, 51.433139],
          [-23.473843, 58.267127],
          [-18.216949, 63.378950],
        ]
      }
    }
  };

  routeTunaSource = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-9.333321, 38.654185],
          [-30.255806, 41.975566],
          [-57.462235, 32.816198],
          [-76.756241, 25.731407],
        ]
      }
    }
  };
  turtleLayer = null;
  tunaLayer= null;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // this.turtleLayer = this.routeTurtleSource;
  }

  openFormAnimals() {
    this.dialog.open(FormAnimalsComponent);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      sppName: 'Agustín',
      place: 'Maldivas',
      weight: 52,
      marks: 'anillos laterales',
      status: 'buen estado',
      picture: 'https://tusreptiles.org/wp-content/uploads/2018/07/1-Tortuga-e1532314986312.jpg'
    };

    this.dialog.open(SppInfoComponent, dialogConfig);
  }

  openRepPlacesModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      place: 'Bolonia (Cádiz)',
      picture: 'https://www.zaharadelosatunes.info/wp-content/uploads/2014/11/bol1.jpg'
    };

    this.dialog.open(ReproductionPlacesInfoComponent, dialogConfig);
  }

  updateMapOptions($event) {
    console.log('llegan las opciones', $event);
    this.id = `boream-${Date.now()}`
    this.mapOptions = $event;
  }

  playMigrationRoute() {

   if (this.mapOptions.tunaMigration === true) {
      this.coordinates = this.routeTunaSource.data.geometry.coordinates;
      this.markerRouteData.class = 'tuna';
    } else if (this.mapOptions.whaleMigration === true) {
      this.coordinates = this.routeWhaleSource.data.geometry.coordinates;
      this.markerRouteData.class = 'whale';
    } else if (this.mapOptions.turtleMigration === true) {
      this.coordinates = this.routeTurtleSource.data.geometry.coordinates;
      this.markerRouteData.class = 'turtle';
    }

    this.updateMarkerData(0);

  }

  updateMarkerData(i) {

    let lon = this.coordinates[i][0];
    let lat = this.coordinates[i][1];
    if( i > 0) {
      this.playing = true;
    }

    this.markerRouteData.latitude = lat;
    this.markerRouteData.longitude = lon;
    i = i +1;
    if (i < this.coordinates.length) {
      setTimeout(() => this.updateMarkerData(i), 1000);
    } else {
      this.playing = false;
    }
    console.log(this.markerRouteData.latitude);
    console.log(this.markerRouteData.longitude);
    console.log('updateMarkerData');
  }

}
