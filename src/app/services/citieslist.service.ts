import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";
import {CitiesList} from "../Models/CitiesList";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitieslistService {

  dataStore: {
    citiesLists: CitiesList[]
  };
  _CitiesLists: BehaviorSubject<CitiesList[]>;
  // post request
  postCitiesList(citiesList: CitiesList): Promise<CitiesList> {
    const citiesListsUrl = environment.apiUrl + 'citiesList';
    return new Promise((resolver, reject) => {
        this.dataStore.citiesLists.push(citiesList);
        this.http.post(citiesListsUrl, citiesList).subscribe(
          citiesList => {
            this._CitiesLists.next(Object.assign({}, this.dataStore).citiesLists);
            console.log(citiesList);
          }
        );
        resolver(citiesList);
      }
    );
  }
  postCitiesLists(citiesLists: CitiesList[]): void {
    citiesLists.forEach(citiesList => {
      this.postCitiesList(citiesList);
    });
  }
  constructor(private http: HttpClient) {
    this.dataStore = {citiesLists: []};
    this._CitiesLists = new BehaviorSubject<CitiesList[]>([]);

  }
  getCitiesLists(): Observable<CitiesList[]> {
    return this._CitiesLists.asObservable();
  }
  fetchCitiesLists() {
    const url = environment.apiUrl + 'citiesList';
    return this.http.get<CitiesList[]>(url)
      .subscribe(data => {
        this.dataStore.citiesLists = data;
        this._CitiesLists.next(Object.assign({}, this.dataStore).citiesLists);
      }, error => {
        console.log(console.log(error));
      });
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.citiesLists.find(x => x.id == id)) id++;
    return id;
  }

  get citiesListSet() {
    return this.dataStore.citiesLists;
  }

  updateCitiesList(id: number, citiesList: CitiesList) {
    const citiesListIdUrl = environment.apiUrl + 'citiesList/' + id;
    const citiesListsUrl = environment.apiUrl + 'citiesList';
    return new Promise((resolver, reject) => {
        this.http.put(citiesListIdUrl, citiesList).subscribe(
          citiesList => {
            this.http.get<CitiesList[]>(citiesListsUrl)
              .subscribe(
                data => {
                  this.dataStore.citiesLists = data;
                  this._CitiesLists.next(Object.assign({}, this.dataStore).citiesLists);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(citiesList);
      }
    );
  }
  updateCitiesLists(citiesLists): void {
    citiesLists.forEach(citiesList => {
      this.updateCitiesList(citiesList.id, citiesList);
    });
  }

  // delete request
  deleteCitiesList(citiesList: CitiesList) {
    const citiesListIdUrl = environment.apiUrl + 'citiesList/' + citiesList.id;
    const citiesListsId = environment.apiUrl + 'citiesList';
    return new Promise((resolver, reject) => {
        this.http.delete(citiesListIdUrl).subscribe(
          citiesList => {
            this.http.get<CitiesList[]>(citiesListsId)
              .subscribe(
                data => {
                  this.dataStore.citiesLists = data;
                  this._CitiesLists.next(Object.assign({}, this.dataStore).citiesLists);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(citiesList);
      }
    );
  }

  deleteCitiesLists(citiesLists): void {
    citiesLists.forEach(citiesList => {
      this.deleteCitiesList(citiesList);
    });
  }

}
