import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DummyService } from '../../@services/dummy.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  public productList: string[] = [];
  constructor(
    public salesSvc: SalesService,
    public dummySvc: DummyService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.salesSvc.isTemplate = false;
    });

    for (let i = 0; i < 20; i++) {
      this.productList.push('');
    }

    console.log(this.productList);
  }
}
