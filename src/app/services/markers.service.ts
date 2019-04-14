import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

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
          [-9.368543, 42.207046],
          [-9.332207, 51.433139],
          [-23.473843, 58.267127],
          [-18.216949, 63.378950],
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
      longitude: -10.552110,
      latitude: 41.914274,
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

  fetchMarkers(options) {
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
