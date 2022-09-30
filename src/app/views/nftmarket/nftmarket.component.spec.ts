import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftmarketComponent } from './nftmarket.component';

describe('NftmarketComponent', () => {
  let component: NftmarketComponent;
  let fixture: ComponentFixture<NftmarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftmarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
