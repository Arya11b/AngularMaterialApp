import { Injectable } from '@angular/core';
import {ToDo} from '../Models/ToDo';
import {Phone} from '../Models/Phone';
import {BehaviorSubject, Observable, of} from 'rxjs'; // for handling async data sync :)
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from '../Models/Group';
import {Address} from '../Models/Address';
import {environment} from "../../environments/environment";
//
// service in service scenario common
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : environment.apiUrl
  })
};
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // class initialization
  private dataStore: { todos: ToDo[]};
  _ToDos: BehaviorSubject<ToDo[]>;
  constructor( private http: HttpClient) {
    this.dataStore = { todos : []};
    this._ToDos = new BehaviorSubject<ToDo[]>([]);
  }

// class functions

  // post request
  postTodo(todo: ToDo): Promise<ToDo> {
    const todosUrl = environment.apiUrl + 'todo';
    return new Promise((resolver, reject) => {
        // this.dataStore.todos.push(todo);
        this.http.post(todosUrl, todo, httpOptions).subscribe(
          todo => {
            this._ToDos.next(Object.assign({}, this.dataStore).todos);
            this.fetchTodos();
          }
        );
        resolver(todo);
      }
    );
  }
  // put request
  updateTodo(id: number, todo: ToDo){
    console.log(todo);
    const todoIdUrl = environment.apiUrl + 'todo/' + id;
    const todosUrl = environment.apiUrl + 'todo';
    console.log(todoIdUrl);
    return new Promise((resolver, reject) => {
        this.http.put(todoIdUrl,todo).subscribe(
          todo => {
            console.log(todo);
            this.http.get<ToDo[]>(todosUrl)
              .subscribe(
                data => {
                  this.dataStore.todos = data;
                  this._ToDos.next(Object.assign({}, this.dataStore).todos);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(todo);
      }
    );
  }
  // delete request
  deleteTodo(todo: ToDo) {
    console.log(todo);
    const todosUrlDel =  environment.apiUrl + 'todo/' + todo.id;
    return new Promise((resolver, reject) => {
        this.http.delete(todosUrlDel).subscribe(
          todo => {
            this.fetchTodos();
          }
        );
        resolver(todo);
      }
    );
  }
  // fetch Datas
  fetchTodos() {
    const todosUrl = environment.apiUrl + 'todo';
    return this.http.get<ToDo[]>(todosUrl)
      .subscribe(data => {
        console.log(data);
        this.dataStore.todos = data;
        this._ToDos.next(Object.assign({}, this.dataStore).todos);
      }, error => {
        console.log(error);
      });
  }
  // observables
  get todoSet() {
    return this.dataStore.todos;
  }
}
