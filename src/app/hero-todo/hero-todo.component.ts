import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hero-todo',
  templateUrl: './hero-todo.component.html',
  styleUrls: ['./hero-todo.component.scss']
})
export class HeroTodoComponent implements OnInit {
  @Input() todos;
  todoCols = ['position', 'todo', 'date'];
  constructor() { }

  ngOnInit() {
    console.log(this.todos);
  }

}
