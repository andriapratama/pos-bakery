import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BillingQueue } from '../../@entities/billing-queue';
import { FormatCurrencyPipe } from '../../@pipes/format-currency.pipe';
import { FormatDatePipe } from '../../@pipes/format-date.pipe';
import { FormatTimePipe } from '../../@pipes/format-time.pipe';
import { DummyService } from '../../@services/dummy.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-billing-queue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularSvgIconModule,
    FormatCurrencyPipe,
    FormatDatePipe,
    FormatTimePipe,
  ],
  templateUrl: './billing-queue.component.html',
  styleUrl: './billing-queue.component.scss',
})
export class BillingQueueComponent implements OnInit {
  public filterList: string[] = ['all', 'active', 'closed'];
  public filterActive: string = 'all';
  public search: string = '';
  public isShowSearchBillingQueue: boolean = false;
  public isShowSearchTrackOrder: boolean = false;

  constructor(
    public salesSvc: SalesService,
    public dummySvc: DummyService,
  ) {}

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.salesSvc.isTemplate = true;
    });
  }

  public async onSelectFilter(filter: string): Promise<void> {
    this.search = '';
    this.isShowSearchBillingQueue = false;
    this.filterActive = filter;
  }

  public onShowSearchBillingQueue(): void {
    this.isShowSearchBillingQueue = !this.isShowSearchBillingQueue;
  }

  public onShowSearchTrackOrder(): void {
    this.isShowSearchTrackOrder = !this.isShowSearchTrackOrder;
  }

  public async onSearch(): Promise<void> {}

  public findTotalBillingActive(): number {
    const filterBilling: BillingQueue[] = this.dummySvc.billingQueueList.filter(
      (billing) => billing.status === true,
    );
    return filterBilling.length;
  }
}
