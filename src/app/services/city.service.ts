import { Injectable } from '@angular/core';
import {City} from "../Models/City";
import {BehaviorSubject, Observable} from "rxjs/index";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  dataStore: {
    cities: City[]
  };
  _Cities: BehaviorSubject<City[]>;
  // post request
  postCity(city: City): Promise<City> {
    const citiesUrl = environment.apiUrl + 'city';
    return new Promise((resolver, reject) => {
        this.dataStore.cities.push(city);
        this.http.post(citiesUrl, city).subscribe(
          city => {
            this._Cities.next(Object.assign({}, this.dataStore).cities);
            console.log(city);
          }
        );
        resolver(city);
      }
    );
  }
  postCities(cities: City[]): void {
    cities.forEach(city => {
      this.postCity(city);
    });
  }
  constructor(private http: HttpClient) {
    this.dataStore = {cities: []};
    this._Cities = new BehaviorSubject<City[]>([]);

  }
  getCities(): Observable<City[]> {
    return this._Cities.asObservable();
  }
  fetchCities() {
    const url = environment.apiUrl + 'city';
    return this.http.get<City[]>(url)
      .subscribe(data => {
        this.dataStore.cities = data;
        this._Cities.next(Object.assign({}, this.dataStore).cities);
      }, error => {
        console.log(console.log(error));
      });
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.cities.find(x => x.id == id)) id++;
    return id;
  }

  get citySet() {
    return this.dataStore.cities;
  }

  updateCity(id: number, city: City) {
    const cityIdUrl = environment.apiUrl + 'city/' + id;
    const citiesUrl = environment.apiUrl + 'city';
    console.log(cityIdUrl);
    return new Promise((resolver, reject) => {
        this.http.put(cityIdUrl, city).subscribe(
          city => {
            this.http.get<City[]>(citiesUrl)
              .subscribe(
                data => {
                  this.dataStore.cities = data;
                  this._Cities.next(Object.assign({}, this.dataStore).cities);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(city);
      }
    );
  }
  updateCities(cities): void {
    cities.forEach(city => {
      this.updateCity(city.id, city);
    });
  }

  // delete request
  deleteCity(city: City) {
    console.log(city);
    const cityIdUrl = environment.apiUrl + 'city/' + city.id;
    const citiesId = environment.apiUrl + 'city';
    return new Promise((resolver, reject) => {
        this.http.delete(cityIdUrl).subscribe(
          city => {
            this.http.get<City[]>(citiesId)
              .subscribe(
                data => {
                  this.dataStore.cities = data;
                  this._Cities.next(Object.assign({}, this.dataStore).cities);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(city);
      }
    );
  }
  deleteCities(cities): void {
    cities.forEach(city => {
      this.deleteCity(city);
    });
  }
}
