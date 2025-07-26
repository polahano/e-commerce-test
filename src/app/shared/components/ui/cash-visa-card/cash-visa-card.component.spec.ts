import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashVisaCardComponent } from './cash-visa-card.component';

describe('CashVisaCardComponent', () => {
  let component: CashVisaCardComponent;
  let fixture: ComponentFixture<CashVisaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashVisaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashVisaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
