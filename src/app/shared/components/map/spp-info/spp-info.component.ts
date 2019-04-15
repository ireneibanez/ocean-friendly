import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Sigthseen } from 'src/app/model/sigthseen.model';

@Component({
  selector: 'app-spp-info',
  templateUrl: './spp-info.component.html',
  styleUrls: ['./spp-info.component.scss']
})
export class SppInfoComponent {
  
  sigthseen: Sigthseen;

  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) data: Sigthseen) {
    this.sigthseen = data;
  }
}
