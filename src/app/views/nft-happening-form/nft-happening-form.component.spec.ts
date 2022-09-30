import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftHappeningFormComponent } from './nft-happening-form.component';

describe('NftHappeningFormComponent', () => {
  let component: NftHappeningFormComponent;
  let fixture: ComponentFixture<NftHappeningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftHappeningFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftHappeningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
