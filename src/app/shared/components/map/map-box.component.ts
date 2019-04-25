import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAnimalsComponent } from '../form-animals/form-animals.component';
import { SppInfoComponent } from '../map/spp-info/spp-info.component';
import { ReproductionPlacesInfoComponent } from '../map/reproduction-places-info/reproduction-places-info.component';
import { SightingService } from 'src/app/services/sighting.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Sigthing } from 'src/app/model/sigthing.model';
import { Marker } from 'src/app/model/marker.model';
import { ReproductionPlace } from 'src/app/model/reproduction-place.model';
import { AuthService } from 'src/app/services/auth.service';


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

  reproductionPlaces:ReproductionPlace[];
  markers:Marker[];
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
  initError: string;
  //TODO: ver para que se usa esto
  turtleLayer = null;
  tunaLayer= null;
  userLogged;

  private markersSubscription: Subscription;
  private repPlacesSubscription: Subscription;

  constructor(public dialog: MatDialog, private sightingService: SightingService, private authService: AuthService) {}

  ngOnInit() {

    this.userLogged = this.authService.getUserLogged();
    console.log(this.userLogged);
    this.migrationRoutes = this.sightingService.getMigrationRoutes();

    this.markersSubscription = this.sightingService.getSightings().subscribe(
      (markers: Marker[]) => {
        this.markers = this.applyFilters(markers);
      },
      (error: HttpErrorResponse) => {
        this.initError = 'Your markers cannont be loaded. Please try again after few minutes.';
      }
    );

    this.repPlacesSubscription = this.sightingService.getReproductionPlaces().subscribe(
      (markers: Marker[]) => {
        this.reproductionPlaces = this.applyFilters(markers);
        console.log(this.reproductionPlaces);
      },
      (error: HttpErrorResponse) => {
        this.initError = 'Your markers cannont be loaded. Please try again after few minutes.';
      }
    )
  }

  openFormAnimals() {

    const dialogRef = this.dialog.open(FormAnimalsComponent);

    dialogRef.afterClosed().subscribe(
      (data: Sigthing) => {
        this.sightingService.createSighting(data).subscribe(()=>{
          console.log('se ha creado correctamente');
        });
      }
    );
  }

  openModal(marker) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = marker;

    if (marker.type === 'love') {
      this.dialog.open(ReproductionPlacesInfoComponent, dialogConfig);
    } else {
      this.dialog.open(SppInfoComponent, dialogConfig);
    }
  }


  async updateMapOptions($event) {
    console.log('llegan las opciones', $event);
    this.id = `boream-${Date.now()}`;
    this.mapOptions = $event;
    debugger
    this.markersSubscription = await this.sightingService.getSightings().subscribe(
      (markers: Marker[]) => {
        debugger
        this.markers = this.applyFilters(markers);
        console.log(this.markers);
      }
    );
    this.repPlacesSubscription = await this.sightingService.getReproductionPlaces().subscribe(
      (markers: Marker[]) => {
        debugger;
        this.reproductionPlaces = this.applyFilters(markers);
        console.log(this.reproductionPlaces);
      },
      (error: HttpErrorResponse) => {
        this.initError = 'Your markers cannont be loaded. Please try again after few minutes.';
      }
    )
  }

  private applyFilters(markers: Marker[]): Marker[] {

    console.log(markers, this.mapOptions);

    return markers.filter((marker: Marker) => {

      if (!this.mapOptions.tuna && marker.spp === 'tuna') {
        return false;
      }

      if (!this.mapOptions.turtle && marker.spp === 'turtle') {
        return false;
      }

      if (!this.mapOptions.whale && marker.spp === 'whale') {
        return false;
      }

      if (!this.mapOptions.individuals && marker.type === 'individuals') {
        return false;
      }

      if (!this.mapOptions.reproductionPlaces && marker.type === 'love') {
        return false;
      }

      return true;

    });
  }

  playMigrationRoute() {

    if (this.playing) {
      return false;
    }

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
    if (this.repPlacesSubscription) {
      this.repPlacesSubscription.unsubscribe();
    }
  }
}
