import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAnimalsComponent } from '../form-animals/form-animals.component';
import { SppInfoComponent } from '../map/spp-info/spp-info.component';



@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
})
export class MapBoxComponent {

  constructor (public dialog: MatDialog){}

  openFormAnimals(){
    this.dialog.open(FormAnimalsComponent);
  }

  openModal() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      sppName: 'Agustín',
      place: 'Maldivas',
      weight: 52,
      marks: 'anillos laterales',
      status: 'buen estado',
      picture: 'https://tusreptiles.org/wp-content/uploads/2018/07/1-Tortuga-e1532314986312.jpg'
    };

    this.dialog.open(SppInfoComponent, dialogConfig);
  }
}


