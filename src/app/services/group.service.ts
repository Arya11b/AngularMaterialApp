import { Injectable } from '@angular/core';
import {Group} from "../Models/Group";
import {BehaviorSubject, Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[];
  _Groups: BehaviorSubject<Group[]>;
  constructor(private http: HttpClient) {
    this._Groups = new BehaviorSubject<Group[]>([]);
    this.groups = []

  }
  getGroups(): Observable<Group[]> {
    return this._Groups.asObservable();
  }
  fetchGroups() {
    const url = 'https://localhost:44392/api/group';
    return this.http.get<Group[]>(url)
      .subscribe(data => {
        this.groups = data;
        this._Groups.next(Object.assign({}, this.groups));
      }, error => {
        console.log(console.log(error));
      });
  }
  get groupSet() {
    return this.groups;
  }

}
