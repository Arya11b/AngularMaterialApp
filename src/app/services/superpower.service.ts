import { Injectable } from '@angular/core';
import {SuperPower} from "../Models/SuperPower";
import {BehaviorSubject, Observable} from "rxjs/index";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SuperpowerService {

  dataStore: {
    superPowers: SuperPower[]
  };
  _SuperPowers: BehaviorSubject<SuperPower[]>;
  // post request
  postSuperPower(superPower: SuperPower): Promise<SuperPower> {
    const superPowersUrl = environment.apiUrl + 'superPower';
    return new Promise((resolver, reject) => {
        this.dataStore.superPowers.push(superPower);
        this.http.post(superPowersUrl, superPower).subscribe(
          superPower => {
            this._SuperPowers.next(Object.assign({}, this.dataStore).superPowers);
            console.log(superPower);
          }
        );
        resolver(superPower);
      }
    );
  }
  postSuperPowers(superPowers: SuperPower[]): void {
    superPowers.forEach(superPower => {
      this.postSuperPower(superPower);
    });
  }
  constructor(private http: HttpClient) {
    this.dataStore = {superPowers: []};
    this._SuperPowers = new BehaviorSubject<SuperPower[]>([]);

  }
  getSuperPowers(): Observable<SuperPower[]> {
    return this._SuperPowers.asObservable();
  }
  fetchSuperPowers() {
    const url = environment.apiUrl + 'superPower';
    return this.http.get<SuperPower[]>(url)
      .subscribe(data => {
        this.dataStore.superPowers = data;
        this._SuperPowers.next(Object.assign({}, this.dataStore).superPowers);
      }, error => {
        console.log(console.log(error));
      });
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.superPowers.find(x => x.id == id)) id++;
    return id;
  }

  get superPowerSet() {
    return this.dataStore.superPowers;
  }

  updateSuperPower(id: number, superPower: SuperPower) {
    const superPowerIdUrl = environment.apiUrl + 'superPower/' + id;
    const superPowersUrl = environment.apiUrl + 'superPower';
    console.log(superPowerIdUrl);
    return new Promise((resolver, reject) => {
        this.http.put(superPowerIdUrl, superPower).subscribe(
          superPower => {
            this.http.get<SuperPower[]>(superPowersUrl)
              .subscribe(
                data => {
                  this.dataStore.superPowers = data;
                  this._SuperPowers.next(Object.assign({}, this.dataStore).superPowers);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(superPower);
      }
    );
  }
  updateSuperPowers(superPowers): void {
    superPowers.forEach(superPower => {
      this.updateSuperPower(superPower.id, superPower);
    });
  }

  // delete request
  deleteSuperPower(superPower: SuperPower) {
    console.log(superPower);
    const superPowerIdUrl = environment.apiUrl + 'superPower/' + superPower.id;
    const superPowersId = environment.apiUrl + 'superPower';
    return new Promise((resolver, reject) => {
        this.http.delete(superPowerIdUrl).subscribe(
          superPower => {
            this.http.get<SuperPower[]>(superPowersId)
              .subscribe(
                data => {
                  this.dataStore.superPowers = data;
                  this._SuperPowers.next(Object.assign({}, this.dataStore).superPowers);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(superPower);
      }
    );
  }
  deleteSuperPowers(superPowers): void {
    superPowers.forEach(superPower => {
      this.deleteSuperPower(superPower);
    });
  }
}
