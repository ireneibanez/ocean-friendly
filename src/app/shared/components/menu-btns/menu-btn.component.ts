import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrls: ['./menu-btn.component.scss']
})
export class MenuBtnComponent implements OnInit, OnDestroy  {

  @Output() mapOptionsEmitter = new EventEmitter();
  status: boolean = false;

  tuna: boolean;
  whale: boolean;
  turtle: boolean;
  tunaMigrationSwitch: boolean;
  whaleMigrationSwitch: boolean;
  turtleMigrationSwitch: boolean;
  mySpecies: boolean;
  reproductionPlaces: boolean;
  individuals: boolean;
  migrationRoutes: string;
  death: boolean;

  userLogged: User;
  private userLoggedSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initValues();
    this.userLogged = this.authService.getUserLogged();
    this.userLoggedSubscription = this.authService.userLoggedObservable.subscribe((userLogged: User) => {
      this.userLogged = userLogged;
    });

    this.sendMapOptions();
  }

  toggleVisibilityMenuBtns() {
    this.status = !this.status;
  }

  handleChange() {
    this.sendMapOptions();
  }

  selectMigrationRoute(name) {
    this.sendMapOptions();
  }

  initValues() {
    this.tuna = false;
    this.whale = false;
    this.turtle = false;
    this.individuals = false;
    this.reproductionPlaces = false;
    this.mySpecies = false;
    this.tunaMigrationSwitch = false;
    this.whaleMigrationSwitch = false;
    this.turtleMigrationSwitch = false;
    this.death = false;
  }

  sendMapOptions() {
    const config = {
      tunaMigration: this.migrationRoutes === 'tuna',
      whaleMigration: this.migrationRoutes === 'whale',
      turtleMigration:this.migrationRoutes === 'turtle',
      tuna: this.tuna,
      whale: this.whale,
      turtle: this.turtle,
      mySpecies: this.mySpecies,
      individuals: this.individuals,
      reproductionPlaces: this.reproductionPlaces,
      death: this.death
    };

    this.mapOptionsEmitter.emit(config);
  }

  ngOnDestroy() {
    if (this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }
}
