import {Component, Input, OnInit} from '@angular/core';
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
  @Input() todos;
  todoForm: FormGroup;
  todo: ToDo;
  hero: Hero;
  fields;
  todoCols = ['position', 'todo', 'due' , 'done', 'remove'];
  constructor(private service: OrmService, private fieldService: FieldService,private route: ActivatedRoute) { }

  ngOnInit() {
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
  }
  removeTodo(id){
    let todo = this.service.getTodoById(id);
    this.service.removeTodo(todo);

  }
  disableSubmit(): boolean {
    return this.todoForm.invalid ;
  }

}
