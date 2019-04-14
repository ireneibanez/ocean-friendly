import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAnimalsComponent } from '../form-animals/form-animals.component';
import { SppInfoComponent } from '../map/spp-info/spp-info.component';
import { ReproductionPlacesInfoComponent } from '../map/reproduction-places-info/reproduction-places-info.component';
import { MarkersService } from 'src/app/services/markers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
})

export class MapBoxComponent implements OnInit, OnDestroy {

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

  markers:object[];
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

  migrationRoutes;

  //TODO: ver para que se usa esto
  turtleLayer = null;
  tunaLayer= null;

  private markersSubscription: Subscription;

  constructor(public dialog: MatDialog, private markerService: MarkersService) {}

  ngOnInit() {
    this.migrationRoutes = this.markerService.getMigrationRoutes();

    this.markersSubscription = this.markerService.fetchMarkers(this.mapOptions).subscribe(
      (markers: object[]) => {
        this.markers = markers;
        console.log(this.markers);
      },
      (error: HttpErrorResponse) => {
        // this.initError = 'Your places cannont be loaded. Please try again after few minutes.';
      }
    );
  }

  openFormAnimals() {
    const dialogConfig = new MatDialogConfig();
    
    //TODO: ver como c******* decirle al p*** modal que haga scroll :)

    this.dialog.open(FormAnimalsComponent,dialogConfig);
  }

  openModal(marker) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      sppName: 'Agustín',
      place: 'Maldivas',
      weight: 52,
      marks: 'anillos laterales',
      status: 'buen estado',
      picture: 'https://tusreptiles.org/wp-content/uploads/2018/07/1-Tortuga-e1532314986312.jpg'
    };

    //TODO: uncomment when  
    // dialogConfig.data = marker;

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
      this.coordinates = this.migrationRoutes.tuna.data.geometry.coordinates;
      this.markerRouteData.class = 'tuna';
    } else if (this.mapOptions.whaleMigration === true) {
      this.coordinates = this.migrationRoutes.whale.data.geometry.coordinates;
      this.markerRouteData.class = 'whale';
    } else if (this.mapOptions.turtleMigration === true) {
      this.coordinates = this.migrationRoutes.turtle.data.geometry.coordinates;
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
    i = i+1;
    if (i < this.coordinates.length) {
      setTimeout(() => this.updateMarkerData(i), 1000);
    } else {
      this.playing = false;
    }
  }

  ngOnDestroy() {
    if (this.markersSubscription) {
      this.markersSubscription.unsubscribe();
    }
  }
}
