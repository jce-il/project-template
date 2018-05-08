import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsBarComponent } from './steps-bar.component';

describe('StepsBarComponent', () => {
  let component: StepsBarComponent;
  let fixture: ComponentFixture<StepsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
