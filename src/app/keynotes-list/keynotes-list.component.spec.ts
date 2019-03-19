import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeynotesListComponent } from './keynotes-list.component';

describe('KeynotesListComponent', () => {
  let component: KeynotesListComponent;
  let fixture: ComponentFixture<KeynotesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeynotesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeynotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
