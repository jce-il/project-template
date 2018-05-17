import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgScreenComponent } from './msg-screen.component';

describe('MsgScreenComponent', () => {
  let component: MsgScreenComponent;
  let fixture: ComponentFixture<MsgScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
