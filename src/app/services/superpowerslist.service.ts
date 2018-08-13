import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs/index";
import {SuperPowersList} from "../Models/SuperPowersList";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SuperpowerslistService {
  dataStore: {
    superPowersLists: SuperPowersList[]
  };
  _SuperPowersLists: BehaviorSubject<SuperPowersList[]>;
  // post request
  postSuperPowersList(superPowersList: SuperPowersList): Promise<SuperPowersList> {
    const superPowersListsUrl = environment.apiUrl + 'superPowersList';
    return new Promise((resolver, reject) => {
        this.dataStore.superPowersLists.push(superPowersList);
        this.http.post(superPowersListsUrl, superPowersList).subscribe(
          superPowersList => {
            this._SuperPowersLists.next(Object.assign({}, this.dataStore).superPowersLists);
            console.log(superPowersList);
          }
        );
        resolver(superPowersList);
      }
    );
  }
  postSuperPowersLists(superPowersLists: SuperPowersList[]): void {
    superPowersLists.forEach(superPowersList => {
      this.postSuperPowersList(superPowersList);
    });
  }
  constructor(private http: HttpClient) {
    this.dataStore = {superPowersLists: []};
    this._SuperPowersLists = new BehaviorSubject<SuperPowersList[]>([]);

  }
  getSuperPowersLists(): Observable<SuperPowersList[]> {
    return this._SuperPowersLists.asObservable();
  }
  fetchSuperPowersLists() {
    const url = environment.apiUrl + 'superPowersList';
    return this.http.get<SuperPowersList[]>(url)
      .subscribe(data => {
        this.dataStore.superPowersLists = data;
        this._SuperPowersLists.next(Object.assign({}, this.dataStore).superPowersLists);
      }, error => {
        console.log(console.log(error));
      });
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.superPowersLists.find(x => x.id == id)) id++;
    return id;
  }

  get superPowersListSet() {
    return this.dataStore.superPowersLists;
  }

  updateSuperPowersList(id: number, superPowersList: SuperPowersList) {
    const superPowersListIdUrl = environment.apiUrl + 'superPowersList/' + id;
    const superPowersListsUrl = environment.apiUrl + 'superPowersList';
    console.log(superPowersListIdUrl);
    return new Promise((resolver, reject) => {
        this.http.put(superPowersListIdUrl, superPowersList).subscribe(
          superPowersList => {
            this.http.get<SuperPowersList[]>(superPowersListsUrl)
              .subscribe(
                data => {
                  this.dataStore.superPowersLists = data;
                  this._SuperPowersLists.next(Object.assign({}, this.dataStore).superPowersLists);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(superPowersList);
      }
    );
  }
  updateSuperPowersLists(superPowersLists): void {
    superPowersLists.forEach(superPowersList => {
      this.updateSuperPowersList(superPowersList.id, superPowersList);
    });
  }

  // delete request
  deleteSuperPowersList(superPowersList: SuperPowersList) {
    console.log(superPowersList);
    const superPowersListIdUrl = environment.apiUrl + 'superPowersList/' + superPowersList.id;
    const superPowersListsId = environment.apiUrl + 'superPowersList';
    return new Promise((resolver, reject) => {
        this.http.delete(superPowersListIdUrl).subscribe(
          superPowersList => {
            this.http.get<SuperPowersList[]>(superPowersListsId)
              .subscribe(
                data => {
                  this.dataStore.superPowersLists = data;
                  this._SuperPowersLists.next(Object.assign({}, this.dataStore).superPowersLists);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(superPowersList);
      }
    );
  }
  deleteSuperPowersLists(superPowersLists): void {
    superPowersLists.forEach(superPowersList => {
      this.deleteSuperPowersList(superPowersList);
    });
  }
}
