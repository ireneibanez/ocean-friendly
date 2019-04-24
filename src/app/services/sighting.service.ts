import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Marker } from '../model/marker.model';
import { Sigthing } from '../model/sigthing.model';

const apiOcean = environment.apiOcean;

@Injectable({
  providedIn: 'root'
})

export class SightingService {

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

  // markers: Marker[] = [
  //   {
  //     longitude: -5.700144,
  //     latitude: 44.727501,
  //     spp: 'turtle',
  //     type: 'individuals',
  //     name: 'Luís',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 1,
  //     status: 'Caparazón en muy buen estado'
  //   },
  //   {
  //     longitude: -14.770427,
  //     latitude: 40.893333,
  //     spp: 'tuna',
  //     type: 'individuals',
  //     name: 'Pepe',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 1,
  //     status: 'Muy grande'
  //   },
  //   {
  //     longitude: -14.337788,
  //     latitude: 36.846606,
  //     spp: 'whale',
  //     type: 'individuals',
  //     name: 'La pandilla feliz',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 3,
  //     status: 'Grupo de ballenas que iban muy juntas'
  //   },
  //   {
  //     longitude: -23.443281,
  //     latitude: 15.406215,
  //     spp: 'turtle',
  //     type: 'individuals',
  //     name: 'Las tortugas ninja',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 5,
  //     status: 'Muy rápidas, casi no las ves'
  //   },
  //   {
  //     longitude: -0.612442,
  //     latitude: 37.710681,
  //     spp: 'turtle',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: -16.894436,
  //     latitude: 27.635168,
  //     spp: 'turtle',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: 2.659747,
  //     latitude: 39.255417,
  //     spp: 'turtle',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '2019-04-17',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: 20.256259,
  //     latitude: 38.709630,
  //     spp: 'turtle',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: -90.219488,
  //     latitude: 25.110005,
  //     spp: 'tuna',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: 21.178576,
  //     latitude: 35.297258,
  //     spp: 'tuna',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: -74.481626,
  //     latitude: 26.794279,
  //     spp: 'tuna',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: -40.568458,
  //     latitude: 36.566779,
  //     spp: 'whale',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: -91.707920,
  //     latitude: -11.642018,
  //     spp: 'whale',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: 81.352197,
  //     latitude: 0.720585,
  //     spp: 'whale',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: 158.176738,
  //     latitude: 1.634195,
  //     spp: 'whale',
  //     type: 'love',
  //     name: '',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: ''
  //   },
  //   {
  //     longitude: 8.087931,
  //     latitude: 40.577512,
  //     spp: 'turtle',
  //     type: 'individuals',
  //     name: 'Agustín',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: 'Es muy bello, tiene un color verde precioso'
  //   },
  //   {
  //     longitude: -7.820738,
  //     latitude: 48.007042,
  //     spp: 'tuna',
  //     type: 'individuals',
  //     name: 'Antoñito',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: 'Parece muy fuerte, está to petao'
  //   },
  //   {
  //     longitude: 2.891490,
  //     latitude: 53.029540,
  //     spp: 'whale',
  //     type: 'individuals',
  //     name: 'Renata',
  //     picture: '',
  //     createdAt: '',
  //     numAnimals: 1,
  //     status: 'Parece en buen estado'
  //   }
  // ]



  constructor(private http: HttpClient) {}

  getSightings(): Observable<object> {
    return this.http.get(`${environment.apiOcean}/api/v1/ocean/sighting`);
  }

  getReproductionPlaces(): Observable<object> {
    return this.http.get(`${environment.apiOcean}/api/v1/ocean/reproduction-places`);
  }

  getMySightings(): Observable<object> {
    return this.http.get(`${environment.apiOcean}/api/v1/ocean/my-sightings`);
  }

  getMigrationRoutes(): object {
    return {
      tuna: this.routeTunaSource,
      whale: this.routeWhaleSource,
      turtle: this.routeTurtleSource
    };
  }

  createSighting(sighting: Sigthing): Observable<object> {
    return this.http.post(`${environment.apiOcean}/api/v1/ocean/sighting`, sighting);
  }

  editSighting(sighting: Sigthing): Observable<object> {
    return this.http.put(`${environment.apiOcean}/api/v1/ocean/sighting/${sighting._id}`, sighting);
  }

  deleteSighting(id) {
    return this.http.delete(`${environment.apiOcean}/api/v1/ocean/sighting/${id}`);
  }
}
