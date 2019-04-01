import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-spp-info',
  templateUrl: './spp-info.component.html',
  styleUrls: ['./spp-info.component.scss']
})
export class SppInfoComponent implements OnInit {
  sppName: string;
  place: string;
  weigth: number;
  marks: string;
  status: string;
  picture: string;
  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) data) {
    if (data && data.sppName) {
      this.sppName = data.sppName;
    }
    if (data && data.place) {
      this.place = data.place;
    }
    if (data && data.weigth) {
      this.weigth= data.weigth;
    }
    if (data && data.marks) {
      this.marks = data.marks;
    }
    if (data && data.status) {
      this.status = data.status;
    }
    if (data && data.picture) {
      this.picture = data.picture;
    }

   }

  ngOnInit() {

  }



}
