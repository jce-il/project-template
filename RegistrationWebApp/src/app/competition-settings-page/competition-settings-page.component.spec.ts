import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSettingsPageComponent } from './competition-settings-page.component';

describe('CompetitionSettingsPageComponent', () => {
  let component: CompetitionSettingsPageComponent;
  let fixture: ComponentFixture<CompetitionSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
