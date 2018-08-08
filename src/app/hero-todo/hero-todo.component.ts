import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from "../services/orm.service";

@Component({
  selector: 'app-hero-todo',
  templateUrl: './hero-todo.component.html',
  styleUrls: ['./hero-todo.component.scss']
})
export class HeroTodoComponent implements OnInit {
  @Input() todos;
  todoCols = ['position', 'todo', 'due' , 'done'];
  constructor(private service: OrmService) { }

  ngOnInit() {
  }
  updateTodo(id) {
    console.log(id);
    let todo = this.service.getTodoById(id);
    console.log(todo);
    this.service.updateTodo(todo);
  }

}
