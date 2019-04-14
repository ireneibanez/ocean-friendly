import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrls: ['./menu-btn.component.scss']
})
export class MenuBtnComponent implements OnInit {

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

  ngOnInit() {
    this.initValues();
  }

  toggleVisibilityMenuBtns() {
    this.status = !this.status;
  }

  handleChange($event) {
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
      reproductionPlaces: this.reproductionPlaces
    };

    this.mapOptionsEmitter.emit(config);
  }
}
