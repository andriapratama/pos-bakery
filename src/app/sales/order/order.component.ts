import { FormatCurrencyPipe } from './../../@pipes/format-currency.pipe';
import { SideOrderComponent } from './@components/side-order/side-order.component';
import { OrderService } from './order.service';
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
  imports: [
    AngularSvgIconModule,
    CommonModule,
    FormsModule,
    SideOrderComponent,
    FormatCurrencyPipe,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  constructor(
    public salesSvc: SalesService,
    public orderSvc: OrderService,
    public dummySvc: DummyService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.salesSvc.isTemplate = false;
    });

    this.orderSvc.productList = this.dummySvc.productList;
  }

  public onShowProductDetailModal(product: Product): void {
    this.orderSvc.isShowProductDetailModal = true;
    this.orderSvc.productSelected = { ...product };
  }

  public onHideProductDetailModal(): void {
    this.orderSvc.isShowProductDetailModal = false;
    setTimeout(() => {
      this.orderSvc.productSelected = new Product();
    }, 200);
  }

  public onIncreaseAmountProductDetailModal(): void {
    this.orderSvc.productSelected.amount += 1;
  }

  public onDecreaseAmountProductDetailModal(): void {
    if (this.orderSvc.productSelected.amount <= 0) {
      this.orderSvc.productSelected.amount = 0;
    } else {
      this.orderSvc.productSelected.amount -= 1;
    }
  }

  public onAddCart(): void {
    if (this.orderSvc.productSelected.amount <= 0) {
      this.toast.error('Add 1 amount first', 'Error');
    } else {
      const indexProduct = this.orderSvc.productList.findIndex(
        (item) => item.id === this.orderSvc.productSelected.id,
      );
      this.orderSvc.productList[indexProduct].amount =
        this.orderSvc.productSelected.amount;
      this.orderSvc.productList[indexProduct].note =
        this.orderSvc.productSelected.note;

      const indexCart = this.orderSvc.cartList.findIndex(
        (item) => item.id === this.orderSvc.productSelected.id,
      );
      if (indexCart < 0) {
        this.orderSvc.cartList.push(this.orderSvc.productSelected);
      } else {
        this.orderSvc.cartList[indexCart].amount =
          this.orderSvc.productSelected.amount;
        this.orderSvc.cartList[indexCart].note =
          this.orderSvc.productSelected.note;
      }

      this.countSummary();
      this.onHideProductDetailModal();
    }
  }

  public countSummary(): void {
    let subTotalTmp: number[] = [];

    this.orderSvc.cartList.map((item) => {
      subTotalTmp.push(item.amount * item.price);
    });
    this.orderSvc.subTotal = subTotalTmp.reduce((sum, item) => sum + item, 0);
    this.orderSvc.tax = (this.orderSvc.subTotal / 100) * 10;
    this.orderSvc.total =
      this.orderSvc.subTotal + this.orderSvc.tax - this.orderSvc.discount;
  }

  public onSaveGlobalNotes(): void {
    this.orderSvc.globalNotes = this.orderSvc.globalNotesTmp;
    this.onHideGlobalNotesModal();
  }

  public onHideGlobalNotesModal(): void {
    this.orderSvc.isShowGlobalNoteModal = false;
    setTimeout(() => {
      this.orderSvc.globalNotesTmp = '';
    }, 200);
  }

  public onGetTotalProduct(name: string): string {
    const data = this.orderSvc.productList.filter(
      (product) =>
        product.category.toLowerCase() === name.toLowerCase().replace(' ', '-'),
    );
    return data.length.toString();
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
