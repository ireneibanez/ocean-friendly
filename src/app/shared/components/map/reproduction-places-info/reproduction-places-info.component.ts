import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reproduction-places-info',
  templateUrl: './reproduction-places-info.component.html',
  styleUrls: ['./reproduction-places-info.component.scss']
})
export class ReproductionPlacesInfoComponent implements OnInit {

  name: string;
  picture: string;
  avg: number;
  avf: number;
  futureAvg: number;
  country: string;

  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {
    if (data && data.name) {
      this.name = data.name;
    }
    if (data && data.picture) {
      this.picture = data.picture;
    }
    if (data && data.country) {
      this.country = data.country;
    }
    if (data && data.avg) {
      this.avg = data.avg;
    }
    if (data && data.avf) {
      this.avf = data.avf;
    }
  }

  async ngOnInit() {
    if (this.country) {
      const result = await this.http.jsonp(`${environment.apiCC}/2020/2039/${this.country}`, 'callback').toPromise();
      this.avf = Math.round(result[7].annualData*10)/10;
    }
  }

}
