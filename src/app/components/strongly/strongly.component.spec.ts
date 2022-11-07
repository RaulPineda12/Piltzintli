import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StronglyComponent } from './strongly.component';

describe('StronglyComponent', () => {
  let component: StronglyComponent;
  let fixture: ComponentFixture<StronglyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StronglyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StronglyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
