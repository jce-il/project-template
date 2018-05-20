import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsUpdatePageComponent } from './projects-update-page.component';

describe('ProjectsUpdatePageComponent', () => {
  let component: ProjectsUpdatePageComponent;
  let fixture: ComponentFixture<ProjectsUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
