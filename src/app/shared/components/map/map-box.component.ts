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
import { User } from 'src/app/model/user.model';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';


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
    reproductionPlaces: false,
    death: false
  };
  mapOptionsRunning;
  playing = false;

  reproductionPlaces: ReproductionPlace[];
  markers: Marker[];
  markerRoute = false;
  markerRouteData = {
    longitude: null,
    latitude: null,
    class: null
  };

  interval = null;
  coordinates = null;
  coordinatesPosition = null;
  id = "hola";

  migrationRoutes;
  initError: string;
  turtleLayer = null;
  tunaLayer = null;
  userLogged: User;

  private markersSubscription: Subscription;
  private repPlacesSubscription: Subscription;
  private userLoggedSubscription: Subscription;

  constructor(public dialog: MatDialog, private sightingService: SightingService, private authService: AuthService) { }

  ngOnInit() {

    this.userLogged = this.authService.getUserLogged();

    this.userLoggedSubscription = this.authService.userLoggedObservable.subscribe((userLogged: User) => {
      this.userLogged = userLogged;
    });

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
        if (data) {
          this.sightingService.createSighting(data).subscribe(() => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = 'Su avistamiento se ha registrado correctamente';
            dialogConfig.disableClose = true;
            this.dialog.open(DialogMessageComponent, dialogConfig);
            this.markersSubscription = this.sightingService.getSightings().subscribe(
              (markers: Marker[]) => {
                this.markers = this.applyFilters(markers);
              },
              (error: HttpErrorResponse) => {
                this.initError = 'Your markers cannont be loaded. Please try again after few minutes.';
              }
            );
          });
        }
      }
    );
  }

  openModal(marker) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = marker;

    if (marker.type === 'love') {
      this.dialog.open(ReproductionPlacesInfoComponent, dialogConfig);
    } else {
      this.dialog.open(SppInfoComponent, dialogConfig);
    }
  }


  updateMapOptions($event) {

    const newMapOptions = $event;

    if (this.mapOptions.whaleMigration !== newMapOptions.whaleMigration ||
      this.mapOptions.tunaMigration !== newMapOptions.tunaMigration ||
      this.mapOptions.turtleMigration !== newMapOptions.turtleMigration) {
      this.id = `boream-${Date.now()}`;
    }

    this.mapOptions = newMapOptions;

    this.markersSubscription = this.sightingService.getSightings().subscribe(
      (markers: Marker[]) => {
        this.markers = this.applyFilters(markers);
      }
    );
    this.repPlacesSubscription = this.sightingService.getReproductionPlaces().subscribe(
      (markers: Marker[]) => {
        this.reproductionPlaces = this.applyFilters(markers);
      },
      (error: HttpErrorResponse) => {
        this.initError = 'Your markers cannont be loaded. Please try again after few minutes.';
      }
    )
  }

  private applyFilters(markers: Marker[]): Marker[] {

    const markersFiltered = markers.filter((marker: Marker) => {

      if (!this.mapOptions.tuna && marker.spp === 'tuna') {
        return false;
      }

      if (!this.mapOptions.turtle && marker.spp === 'turtle') {
        return false;
      }

      if (!this.mapOptions.whale && marker.spp === 'whale') {
        return false;
      }

      if (!this.mapOptions.individuals && marker.type === 'individuals' && !this.mapOptions.mySpecies && marker.status !== 'dead') {
        return false;
      }

      if (!this.mapOptions.reproductionPlaces && marker.type === 'love') {
        return false;
      }

      if (!this.mapOptions.death && marker.status === 'dead') {
        return false;
      }

      if (!this.mapOptions.individuals && this.mapOptions.mySpecies && marker.type === 'individuals' && this.userLogged && this.userLogged.id !== marker.user) {
        return false;
      }

      return true;

    });

    return markersFiltered;
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
    this.mapOptionsRunning = this.mapOptions;
    this.updateMarkerData(0);
  }

  stopMigrationRoute() {
    this.mapOptionsRunning = null;
  }

  updateMarkerData(i) {

    if (this.mapOptionsRunning != this.mapOptions) {
      this.playing = false;
      this.markerRouteData = {
        longitude: null,
        latitude: null,
        class: null
      };

      return;
    }

    let lon = this.coordinates[i][0];
    let lat = this.coordinates[i][1];
    if (i > 0) {
      this.playing = true;
    }

    this.markerRouteData.latitude = lat;
    this.markerRouteData.longitude = lon;
    i = i + 1;
    if (i < this.coordinates.length) {
      setTimeout(() => this.updateMarkerData(i), 1000);
    } else {
      this.playing = false;
      this.markerRouteData = {
        longitude: null,
        latitude: null,
        class: null
      };
    }
  }

  ngOnDestroy() {
    if (this.markersSubscription) {
      this.markersSubscription.unsubscribe();
    }
    if (this.repPlacesSubscription) {
      this.repPlacesSubscription.unsubscribe();
    }
    if (this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }
}
