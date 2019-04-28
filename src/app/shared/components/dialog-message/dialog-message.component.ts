import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent {

  message: string;

  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) data: string) {
    this.message = data;
  }
}
