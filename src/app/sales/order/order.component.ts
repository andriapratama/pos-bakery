import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../@entities/product';
import { DummyService } from '../../@services/dummy.service';
import { ToastService } from '../../@services/toast.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  public productList: Product[] = [];
  public productSelected: Product = new Product();
  public cartList: Product[] = [];
  public isShowProductDetailModal: boolean = false;
  public subTotal: number = 0;
  public tax: number = 0;
  public discount: number = 0;
  public total: number = 0;

  constructor(
    public salesSvc: SalesService,
    public dummySvc: DummyService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.salesSvc.isTemplate = false;
    });

    this.productList = this.dummySvc.productList;
  }

  public onShowProductDetailModal(product: Product): void {
    this.isShowProductDetailModal = true;
    this.productSelected = { ...product };
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

  public onIncreaseAmountProductDetailModal(): void {
    this.productSelected.amount += 1;
  }

  public onDecreaseAmountProductDetailModal(): void {
    if (this.productSelected.amount <= 0) {
      this.productSelected.amount = 0;
    } else {
      this.productSelected.amount -= 1;
    }
  }

  public onAddCart(): void {
    if (this.productSelected.amount <= 0) {
      this.toast.error('Add 1 amount first', 'Error');
    } else {
      const indexProduct = this.dummySvc.productList.findIndex(
        (item) => item.id === this.productSelected.id,
      );
      this.dummySvc.productList[indexProduct].amount =
        this.productSelected.amount;
      this.dummySvc.productList[indexProduct].note = this.productSelected.note;

      const indexCart = this.cartList.findIndex(
        (item) => item.id === this.productSelected.id,
      );
      if (indexCart < 0) {
        this.cartList.push(this.productSelected);
      } else {
        this.cartList[indexCart].amount = this.productSelected.amount;
        this.cartList[indexCart].note = this.productSelected.note;
      }

      this.countSummary();
      this.onHideProductDetailModal();
    }
  }

  public countSummary(): void {
    let subTotalTmp: number[] = [];

    this.cartList.map((item) => {
      subTotalTmp.push(item.amount * item.price);
    });
    this.subTotal = subTotalTmp.reduce((sum, item) => sum + item, 0);
    this.tax = (this.subTotal / 100) * 10;
    this.total = this.subTotal + this.tax - this.discount;
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
