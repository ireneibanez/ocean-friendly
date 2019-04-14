import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiCC = environment.apiCC;

@Injectable({
  providedIn: 'root'
})

export class ClimateChangeService {

  constructor(private httpClient: HttpClient) {}

  fetchClimateData() {
    return this.httpClient.get(apiCC + '/type/var/start/end/ISO3[.ext]')
      .toPromise()
  }
}
