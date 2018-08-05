import { Injectable } from '@angular/core';
import {Phone} from '../Models/Phone';
import {BehaviorSubject, Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : 'https://localhost:8080'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  dataStore: {
    phones: Phone[]
  };
  _Phones: BehaviorSubject<Phone[]>;
  getValidPhoneId(hero): void{
    for (let phoneNumber of hero.phoneNumber)
      phoneNumber.id = this.getValidId();
  }

  // post request
  postPhone(phone: Phone): Promise<Phone> {
    const heroesUrl = 'https://localhost:44392/api/phone';
    return new Promise((resolver, reject) => {
        this.dataStore.phones.push(phone);
        this.http.post(heroesUrl, phone, httpOptions).subscribe(
          phone => {
            this._Phones.next(Object.assign({}, this.dataStore).phones);
            console.log(phone);
          }
        );
        resolver(phone);
      }
    );
  }
  postPhones(phones: Phone[]): void {
    phones.forEach(phone => {
      this.postPhone(phone);
    });
  }
  constructor(private http: HttpClient) {
    this.dataStore = {phones: []};
    this._Phones = new BehaviorSubject<Phone[]>([]);

  }
  getPhones(): Observable<Phone[]> {
    return this._Phones.asObservable();
  }
  fetchPhones() {
    const url = 'https://localhost:44392/api/phone';
    return this.http.get<Phone[]>(url)
      .subscribe(data => {
        this.dataStore.phones = data;
        this._Phones.next(Object.assign({}, this.dataStore).phones);
      }, error => {
        console.log(console.log(error));
      });
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.phones.find(x => x.id == id)) id++;
    return id;
  }

  get phoneSet() {
    return this.dataStore.phones;
  }

  updatePhone(id: number, phone: Phone) {
    const phoneIdUrl = 'https://localhost:44392/api/phone/' + id;
    const phonesUrl = 'https://localhost:44392/api/phone';
    console.log(phoneIdUrl);
    return new Promise((resolver, reject) => {
        this.http.put(phoneIdUrl, phone).subscribe(
          phone => {
            this.http.get<Phone[]>(phonesUrl)
              .subscribe(
                data => {
                  this.dataStore.phones = data;
                  this._Phones.next(Object.assign({}, this.dataStore).phones);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(phone);
      }
    );
  }
  updatePhones(phones): void {
    phones.forEach(phone => {
      this.updatePhone(phone.id, phone);
    });
  }

  // delete request
  deletePhone(phone: Phone) {
    console.log(phone);
    const phoneIdUrl = 'https://localhost:44392/api/phone/' + phone.id;
    const phonesId = 'https://localhost:44392/api/phone';
    return new Promise((resolver, reject) => {
        this.http.delete(phoneIdUrl).subscribe(
          phone => {
            this.http.get<Phone[]>(phonesId)
              .subscribe(
                data => {
                  this.dataStore.phones = data;
                  this._Phones.next(Object.assign({}, this.dataStore).phones);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(phone);
      }
    );
  }
  deletePhones(phones): void {
    phones.forEach(phone => {
      this.deletePhone(phone);
    });
  }


}
