import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';

const apiUrl = environment.apiOcean;

@Injectable({
  providedIn: 'root'
})

export class MarkersService {

  routeTurtleSource = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-13.522967, 29.262608],
          [-16.559402, 32.506429],
          [-26.601249, 38.569670],
          [-28.291182, 37.591364],
        ]
      }
    }
  };

  routeWhaleSource = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-74.811306, 25.247000],
          [-75.632841, 31.921013],
          [-71.199295, 34.848355],
          [-71.612101, 39.770114], 
          [-67.511759, 42.372048],
          [-62.975576, 43.867339], 
          [-57.473130, 45.936491], 
          [-47.305171, 45.724207],
          [-51.926586, 57.009205], 
          [-39.617639, 59.402087], 
          [-34.342918, 65.191825],
          [-34.342915, 65.191820]
        ]
      }
    }
  };

  routeTunaSource = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-9.333321, 38.654185],
          [-30.255806, 41.975566],
          [-57.462235, 32.816198],
          [-76.756241, 25.731407],
        ]
      }
    }
  };

  markers = [
    {
      longitude: -5.700144,
      latitude: 44.727501,
      species: 'turtle',
      type: 'individuals',
      text: '',
      mine: false
    },
    {
      longitude: -14.770427,
      latitude: 40.893333,
      species: 'tuna',
      type: 'individuals',
      text: '',
      mine: true
    },
    {
      longitude: -14.337788,
      latitude: 36.846606,
      species: 'whale',
      type: 'individuals',
      text: '',
      mine: false
    },
    {
      longitude: 1.230405,
      latitude: 38.762061,
      species: 'turtle',
      type: 'love',
      text: ''
    },
    {
      longitude: -5.751355,
      latitude: 36.007605,
      species: 'tuna',
      type: 'love',
      text: ''
    },
    {
      longitude: -40.568458,
      latitude: 36.566779,
      species: 'whale',
      type: 'love',
      text: ''
    },
    { 
      longitude: -91.707920,
      latitude: -11.642018,
      species: 'whale',
      type: 'love',
      text: ''
    },
    {
      longitude: 81.352197,
      latitude: 0.720585,
      species: 'whale',
      type: 'love',
      text: ''
    },
    { 
      longitude: 158.176738,
      latitude: 1.634195,
      species: 'whale',
      type: 'love',
      text: ''
    },
    {
      longitude: 8.087931,
      latitude: 40.577512,
      species: 'turtle',
      type: 'individuals',
      text: 'Agustín',
      mine: true
    },
    {
      longitude: -7.820738,
      latitude: 48.007042,
      species: 'tuna',
      type: 'individuals',
      text: 'Antoñito',
      mine: false
    },
    {
      longitude: 2.891490,
      latitude: 53.029540,
      species: 'whale',
      type: 'individuals',
      text: 'Renata',
      mine: true
    }
  ]

  constructor(private httpClient: HttpClient) {}

  fetchMarkers(options): Observable<object> {
    return of(this.markers);
    // return this.httpClient.get(apiUrl + '/markers')
  }

  getMigrationRoutes(): object {
    return {
      tuna: this.routeTunaSource,
      whale: this.routeWhaleSource,
      turtle: this.routeTurtleSource
    };
  }
}
