import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-reproduction-places-info',
  templateUrl: './reproduction-places-info.component.html',
  styleUrls: ['./reproduction-places-info.component.scss']
})
export class ReproductionPlacesInfoComponent implements OnInit {

  place: string;
  picture: string;

  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) data) {
    if (data && data.place) {
      this.place = data.place;
    }
    if (data && data.picture) {
      this.picture = data.picture;
    }

  }

  ngOnInit() {

  }

}
