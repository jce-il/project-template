import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUploadScreenComponent } from './project-upload-screen.component';

describe('ProjectUploadScreenComponent', () => {
  let component: ProjectUploadScreenComponent;
  let fixture: ComponentFixture<ProjectUploadScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUploadScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUploadScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
