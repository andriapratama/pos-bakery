import { Product } from './../../@entities/product';
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
  public productSelected: Product = new Product();
  public isShowProductDetailModal: boolean = false;

  constructor(
    public salesSvc: SalesService,
    public dummySvc: DummyService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.salesSvc.isTemplate = false;
    });
  }

  public onShowProductDetailModal(product: Product): void {
    this.isShowProductDetailModal = true;
    this.productSelected = product;
  }

  public onHideProductDetailModal(): void {
    this.isShowProductDetailModal = false;
    setTimeout(() => {
      this.productSelected = new Product();
    }, 200);
  }

  public formatPrice(price: number, style: 'short' | 'full'): string {
    if (style === 'short') {
      if (price >= 1000) {
        const newFormat = (price / 1000).toFixed(0) + 'K';
        return `IDR ${newFormat}`;
      }
      return `IDR ${price.toString()}`;
    } else {
      const newFormat = new Intl.NumberFormat().format(price);
      return `IDR ${newFormat}`;
    }
  }

  public setCategoryBgColor(category: string) {
    switch (category) {
      case 'breads':
        return 'bg-[#f97316]/10';
      case 'cakes':
        return 'bg-[#22c55e]/10';
      case 'donuts':
        return 'bg-[#06b6d4]/10';
      case 'pastries':
        return 'bg-[#6366f1]/10';
      case 'sandwich':
        return 'bg-[#d946ef]/10';
      case 'coffee':
        return 'bg-[#f43f5e]/10';
      case 'non-coffee':
        return 'bg-[#eab308]/10';
      default:
        return 'bg-[#737373]/10';
    }
  }

  public setCategoryTextColor(category: string) {
    switch (category) {
      case 'breads':
        return 'text-[#f97316]';
      case 'cakes':
        return 'text-[#22c55e]';
      case 'donuts':
        return 'text-[#06b6d4]';
      case 'pastries':
        return 'text-[#6366f1]';
      case 'sandwich':
        return 'text-[#d946ef]';
      case 'coffee':
        return 'text-[#f43f5e]';
      case 'non-coffee':
        return 'text-[#eab308]';
      default:
        return 'text-[#737373]';
    }
  }
}
