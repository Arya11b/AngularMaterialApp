import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeChecklistComponent } from './tree-checklist.component';
import {TreeFieldComponent} from '../../form/tree-field/tree-field.component';
import {SignFormComponent} from '../../sign-form/sign-form.component';
import {MessagesComponent} from '../../messages/messages.component';
import {HeroTodoComponent} from '../../hero-todo/hero-todo.component';
import {HeroDetailComponent} from '../../hero-detail/hero-detail.component';
import {HeroProfileComponent} from '../../hero-profile/hero-profile.component';
import {HeroEditComponent} from '../../hero-edit/hero-edit.component';
import {HomeComponent} from '../../home/home.component';
import {AppRoutingModule} from '../../app-routing.module';
import {MaterialModule} from '../../shared/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FieldService} from '../../services/field.service';
import {APP_BASE_HREF} from '@angular/common';

describe('TreeChecklistComponent', () => {
  let component: TreeChecklistComponent;
  let fixture: ComponentFixture<TreeChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeChecklistComponent , TreeFieldComponent , SignFormComponent, MessagesComponent , HeroTodoComponent , HeroDetailComponent , HeroProfileComponent , HeroEditComponent , HomeComponent  ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule , MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ { provide: MatDialogRef, useValue: {} },FieldService, {provide: APP_BASE_HREF, useValue : '/' }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
