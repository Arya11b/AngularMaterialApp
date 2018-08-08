import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTodoComponent } from './hero-todo.component';

describe('HeroTodoComponent', () => {
  let component: HeroTodoComponent;
  let fixture: ComponentFixture<HeroTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
