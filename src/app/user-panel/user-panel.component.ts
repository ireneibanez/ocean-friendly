import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAnimalsComponent } from '../shared/components/form-animals/form-animals.component';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  spp: string;
  name: string;
  number: string;
  status: string;
  date: string;
  latitude: string;
  longitude: string;

  displayedColumns: string[] = ['spp', 'name', 'number', 'status', 'date', 'latitude', 'longitude'];
  dataSource: any[];

  constructor( public dialog: MatDialog ) { }

  ngOnInit() {
    this.dataSource = [
      {
        spp: 'whale',
        name: 'Juanito',
        number: '1',
        status: 'Good',
        date: '05-01-2018',
        latitude: 'LAT',
        longitude: 'LONG'
      },
      {
        spp: 'turtle',
        name: 'Pepi',
        number: '1',
        status: 'Bad',
        date: '01-02-2015',
        latitude: 'LAT',
        longitude: 'LONG'
      },
      {
        spp: 'tuna',
        name: 'Tartar',
        number: '2',
        status: 'Buen estado',
        date: '01-09-2016',
        latitude: 'LAT',
        longitude: 'LONG'
      },
    ];
  }

  delete(data){
    let index = this.dataSource.indexOf(data);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    console.log(data);
    return data;
  }

  openFormAnimals(data) {
    this.openDialog(data);
  }

  openDialog(data) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(FormAnimalsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this.edit (this.dataSource, data)
    );
  }

  edit (dataSource, data) {

    if (data === undefined) {
      return;
    }

    let finded = dataSource.findIndex((dataSourceItem) => (
      dataSourceItem.name === data.name
    ));
    if (finded >= 0) {
      dataSource.splice(finded, 1, data);
    } else {
      this.add(data);
    }
  }

  add (data) {
    this.dataSource.push(data);
  }


}
