import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../@components/sidebar/sidebar.component';
import { SidebarService } from '../@components/sidebar/sidebar.service';
import { FormatDatePipe } from '../@pipes/format-date.pipe';
import { SideOrderComponent } from './order/@components/side-order/side-order.component';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularSvgIconModule,
    CommonModule,
    FormatDatePipe,
    SidebarComponent,
    SideOrderComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  public date: number;

  public menuList: Array<{ id: string; name: string; route: string }> = [
    {
      id: 'billing-queue',
      name: 'Billing Queue',
      route: '/sales/billing-queue',
    },
    {
      id: 'table-management',
      name: 'Tables',
      route: '/sales/table-management',
    },
    {
      id: 'order-history',
      name: 'Order History',
      route: '/sales/order-history',
    },
  ];

  constructor(
    public salesSvc: SalesService,
    public sidebarSvc: SidebarService,
    public router: Router,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.date = new Date().getTime();

    const url = this.router.url;
    console.log(url, 'url');
  }

  public onClickRouter(router: string): void {
    this.router.navigateByUrl(router).then();
  }
}
