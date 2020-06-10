import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowContainerComponent } from './workflow-container.component';

describe('WorkflowContainerComponent', () => {
  let component: WorkflowContainerComponent;
  let fixture: ComponentFixture<WorkflowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
