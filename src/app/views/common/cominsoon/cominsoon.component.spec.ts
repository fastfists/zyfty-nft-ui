import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CominsoonComponent } from './cominsoon.component';

describe('CominsoonComponent', () => {
  let component: CominsoonComponent;
  let fixture: ComponentFixture<CominsoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CominsoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CominsoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
