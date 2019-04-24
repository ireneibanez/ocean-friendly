import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAnimalsComponent } from '../shared/components/form-animals/form-animals.component';
import { DataSource } from '@angular/cdk/table';
import { SightingService } from '../services/sighting.service';
import { Subscription } from 'rxjs';
import { Sigthing } from '../model/sigthing.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, OnDestroy {

  spp: string;
  name: string;
  numAnimals: string;
  status: string;
  createdAt: string;
  latitude: object;
  longitude: object;

  displayedColumns: any[] = ['spp', 'name', 'number', 'status', 'date', 'latitude', 'longitude'];
  dataSource: any[];
  mySightings: Sigthing[];
  getSightingsSubscription: Subscription;
  deleteSightingSubscription: Subscription;
  editSightingSubscription: Subscription;

  constructor(public dialog: MatDialog, private sightingService: SightingService) { }

  ngOnInit() {
    this.getSightingsSubscription = this.sightingService.getMySightings().subscribe((sightings: Sigthing[])=>{
      this.mySightings = sightings;
    });
  }

  delete(data){
    this.deleteSightingSubscription = this.sightingService.deleteSighting(data._id).subscribe( () => {
      this.getMySightings();
    });
  }

  openFormAnimals(sighting: Sigthing) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = sighting;
    const dialogRef = this.dialog.open(FormAnimalsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (sightingUpdated: Sigthing) => {
        sightingUpdated._id = sighting._id;
        this.edit(sightingUpdated);
      }
    );
  }

  edit (sighting: Sigthing) {
    this.editSightingSubscription = this.sightingService.editSighting(sighting).subscribe(()=>{
      this.getMySightings();
    });
  }

  getMySightings () {
    this.getSightingsSubscription = this.sightingService.getMySightings().subscribe((sightings: Sigthing[])=>{
       this.mySightings = sightings;
    });
  }

  add (data) {
    this.dataSource.push(data);
  }

  ngOnDestroy() {
    if (this.getSightingsSubscription) {
      this.getSightingsSubscription.unsubscribe();
    }
    if (this.deleteSightingSubscription) {
      this.deleteSightingSubscription.unsubscribe();
    }
    if (this.editSightingSubscription) {
      this.editSightingSubscription.unsubscribe();
    }
  }
}
