import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingQueueComponent } from './billing-queue.component';

describe('BillingQueueComponent', () => {
  let component: BillingQueueComponent;
  let fixture: ComponentFixture<BillingQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
