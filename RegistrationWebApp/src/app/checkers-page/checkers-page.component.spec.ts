import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckersPageComponent } from './checkers-page.component';

describe('CheckersPageComponent', () => {
  let component: CheckersPageComponent;
  let fixture: ComponentFixture<CheckersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
