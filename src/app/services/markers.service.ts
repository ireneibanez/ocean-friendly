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
          [20.384001, 37.796346],
          [21.976800, 35.333950],
          [17.929752, 33.490058],
          [12.898728, 36.431576],
          [9.832402, 38.418211],
          [4.159491, 39.297004],
          [2.755758, 39.023073],
          [-0.275247, 37.750699],
          [-0.989185, 37.166392],
          [-2.269620, 36.211350],
          [-8.177108, 35.658544],
          [-12.489851, 28.766447],
          [-14.624307, 27.268777],
          [-16.628474, 27.663401],
          [-23.686097, 17.198596],
          [-23.610639, 15.930230],
          [-23.610630, 15.930233],
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
          [-89.670122, 24.865802],
          [-79.982570, 24.029435],
          [-77.914172, 28.178428], 
          [-71.699607, 36.711986], 
          [-64.399688, 36.994266],
          [-54.946952, 41.591907], 
          [-47.682340, 45.403188],
          [-32.872307, 53.160226],
          [-15.718931, 54.107208],
          [-9.883460, 56.120832], 
          [-5.750597, 59.856036], 
          [0.428280, 58.010850], 
          [3.174246, 52.615353], 
          [0.872744, 50.383344], 
          [-5.994466, 48.967107], 
          [-5.015292, 45.442347], 
          [-10.720471, 43.781731], 
          [-9.678708, 36.666672], 
          [-7.019690, 36.588820], 
          [-5.995908, 35.991257], 
          [-1.733012, 36.183243], 
          [6.852718, 38.579004], 
          [12.493545, 37.101032], 
          [18.314132, 34.321591], 
          [26.141484, 32.524163], 
          [27.139415, 34.663470], 
          [22.729442, 34.772296], 
          [18.845087, 36.290971], 
          [12.865186, 36.566327], 
          [10.412869, 38.237201], 
          [-2.686720, 35.919873], 
          [-5.210898, 36.018792], 
          [-6.248492, 35.996639], 
          [-16.903467, 33.239580], 
          [-27.976910, 37.324772], 
          [-60.455569, 19.032344], 
          [-73.761201, 14.493609], 
          [-85.071324, 20.222332], 
          [-89.604695, 24.317108], 
          [-89.604690, 24.317105], 
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
      longitude: -23.443281,
      latitude: 15.406215,
      species: 'turtle',
      type: 'love',
      text: ''
    },
    {  
      longitude: -0.612442,
      latitude: 37.710681,
      species: 'turtle',
      type: 'love',
      text: ''
    },
    {  
      longitude: -16.894436,
      latitude: 27.635168,
      species: 'turtle',
      type: 'love',
      text: ''
    },
    {   
      longitude: 2.659747,
      latitude: 39.255417,
      species: 'turtle',
      type: 'love',
      text: ''
    },
    { 
      longitude: 20.256259,
      latitude: 38.709630,
      species: 'turtle',
      type: 'love',
      text: ''
    },
    {
      longitude: -90.219488,
      latitude: 25.110005,
      species: 'tuna',
      type: 'love',
      text: ''
    },
    {
      longitude: 21.178576,
      latitude: 35.297258,
      species: 'tuna',
      type: 'love',
      text: ''
    },
    {
      longitude: -74.481626,
      latitude: 26.794279,
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
