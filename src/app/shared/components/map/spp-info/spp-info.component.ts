import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Sigthing } from 'src/app/model/sigthing.model';

@Component({
  selector: 'app-spp-info',
  templateUrl: './spp-info.component.html',
  styleUrls: ['./spp-info.component.scss']
})
export class SppInfoComponent {

  sigthing: Sigthing;

  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) data: Sigthing) {
    this.sigthing = data;
  }
}
