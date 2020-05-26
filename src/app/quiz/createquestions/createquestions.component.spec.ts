import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatequestionsComponent } from './createquestions.component';

describe('CreatequestionsComponent', () => {
  let component: CreatequestionsComponent;
  let fixture: ComponentFixture<CreatequestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatequestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
