import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsGraphComponent } from './commits-graph.component';

describe('CommitsGraphComponent', () => {
  let component: CommitsGraphComponent;
  let fixture: ComponentFixture<CommitsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
