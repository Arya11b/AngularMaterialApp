import {Component, ElementRef, Input, OnInit, ViewChildren} from '@angular/core';
import {OrmService} from "../services/orm.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FieldService} from "../services/field.service";
import {ToDo} from "../Models/ToDo";
import {Hero} from "../Models/Hero";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hero-todo',
  templateUrl: './hero-todo.component.html',
  styleUrls: ['./hero-todo.component.scss']
})
export class HeroTodoComponent implements OnInit {
  todos: ToDo[];
  todoForm: FormGroup;
  todo: ToDo;
  hero: Hero;
  fields;
  searchQuery: string;
  todoCols = ['position', 'todo', 'due' , 'done', 'remove'];
  constructor(private service: OrmService, private fieldService: FieldService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.todos = [];
    this.todo = new ToDo;
    this.hero = new Hero;
    this.fields = this.fieldService.todoFields;
    this.todoForm = new FormGroup({});
    this.fields.forEach(field => {
      this.todoForm.addControl(field.key, new FormControl('', field.validators));
    });
    const id = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes =>{
        if(heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
      });
      this.service.getTodos().subscribe(todos => {
        if (todos.length < 0) return; // it can be zero
        this.todos = this.service.getTodoByParentId(id);
      });
    });
  }
  updateTodo(id) {
    let todo = this.service.getTodoById(id);
    console.log(todo);
    this.service.updateTodo(todo);
  }
  addTodo() {
    this.todo.due = this.todoForm.value.due;
    this.todo.note = this.todoForm.value.note;
    this.service.addTodo(this.todo, this.hero.id);
    this.todoForm.reset();
  }
  removeTodo(id) {
    let todo = this.service.getTodoById(id);
    this.service.removeTodo(todo);

  }
  disableSubmit(): boolean {
    return this.todoForm.invalid ;
  }
  getBeautifiedDate(date): string {
    return date.slice(0, 10).replace('-', ' / ').replace('-', ' / ');
  }
  search() {
    this.todos = this.service.getTodoSearch(this.searchQuery);
  }

}
