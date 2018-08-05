import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {Address} from '../Models/Address';
import {HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : 'https://localhost:8080'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private dataStore: { addresses: Address[]};
  _Addresses: BehaviorSubject<Address[]>;
  getValidAddressId(hero): void{
    for (let address of hero.address)
      address.id = this.getValidId();
  }
  constructor(private http: HttpClient) {
    this.dataStore = {addresses: []};
    this._Addresses = new BehaviorSubject<Address[]>([]);
  }
  fetchAddresses() {
    const url = 'https://localhost:44392/api/address';
    return this.http.get<Address[]>(url)
      .subscribe(data => {
        this.dataStore.addresses = data;
        this._Addresses.next(Object.assign({}, this.dataStore).addresses);
      }, error => {
        console.log(console.log(error));
      });
  }
  getAddresses(): Observable<Address[]> {
    return this._Addresses.asObservable();
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.addresses.find(x => x.id == id)) id++;
    return id;
  }

  get addressSet() {
    return this.dataStore.addresses;
  }
  // post request
  postAddress(address: Address): Promise<Address> {
    const heroesUrl = 'https://localhost:44392/api/address';
    return new Promise((resolver, reject) => {
        this.dataStore.addresses.push(address);
        this.http.post(heroesUrl, address , httpOptions).subscribe(
          address => {
            this._Addresses.next(Object.assign({}, this.dataStore).addresses);
            console.log(address);
          }
        );
        resolver(address);
      }
    );
  }
  updateAddress(id: number, address: Address) {
  const addressIdUrl = 'https://localhost:44392/api/address/' + id;
  const addressesUrl = 'https://localhost:44392/api/address';
  console.log(addressIdUrl);
  return new Promise((resolver, reject) => {
      this.http.put(addressIdUrl, address).subscribe(
        address => {
          this.http.get<Address[]>(addressesUrl)
            .subscribe(
              data => {
                this.dataStore.addresses = data;
                this._Addresses.next(Object.assign({}, this.dataStore).addresses);
              }, error => {
                console.log(console.log(error));
              });
        }
      );
      resolver(address);
    }
  );
}
  postAddresses(addresses: Address[]): void {
    addresses.forEach(address => {
      this.postAddress(address);
    });
  }
  updateAddresses(addresses: Address[]): void{
    addresses.forEach(address => {
      this.updateAddress(address.id, address);
    });
  }
  // delete request
  deleteAddress(address: Address) {
    console.log(address);
    const addressIdUrl = 'https://localhost:44392/api/address/' + address.id;
    const addressesUrl = 'https://localhost:44392/api/address';
    return new Promise((resolver, reject) => {
        this.http.delete(addressIdUrl).subscribe(
          address => {
            this.http.get<Address[]>(addressesUrl)
              .subscribe(
                data => {
                  this.dataStore.addresses = data;
                  this._Addresses.next(Object.assign({}, this.dataStore).addresses);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(address);
      }
    );
  }
  deleteAddresses(addresses): void {
    addresses.forEach(address => {
      this.deleteAddress(address);
    });
  }


}
