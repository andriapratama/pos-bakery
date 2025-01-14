import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../../../@entities/product';
import { FormatCurrencyPipe } from '../../../../@pipes/format-currency.pipe';
import { DummyService } from '../../../../@services/dummy.service';
import { ToastService } from '../../../../@services/toast.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-side-order',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormatCurrencyPipe,
    FormsModule,
  ],
  templateUrl: './side-order.component.html',
  styleUrl: './side-order.component.scss',
})
export class SideOrderComponent {
  constructor(
    public orderSvc: OrderService,
    public dummySvc: DummyService,
    private toast: ToastService,
  ) {}

  public onIcreaseItemAmount(product: Product, index: number): void {
    this.orderSvc.cartList[index].amount += 1;

    const indexProduct = this.orderSvc.productList.findIndex(
      (item) => item.id === product.id,
    );
    this.orderSvc.productList[indexProduct].amount =
      this.orderSvc.cartList[index].amount;

    this.countSummary();
    this.clearProductDetailModal();
  }

  public onDecreaseItemAmount(product: Product, index: number): void {
    const cart = this.orderSvc.cartList;

    if (cart[index].amount <= 1) {
      this.orderSvc.cartList = cart.filter((item, idx) => idx !== index);
    } else {
      cart[index].amount -= 1;

      const indexProduct = this.orderSvc.productList.findIndex(
        (item) => item.id === product.id,
      );
      this.orderSvc.productList[indexProduct].amount =
        this.orderSvc.cartList[index].amount;
    }

    this.countSummary();
    this.clearProductDetailModal();
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

  public onShowProductDetailModal(product: Product): void {
    this.orderSvc.isShowProductDetailModal = true;
    this.orderSvc.productSelected = { ...product };
  }

  clearProductDetailModal(): void {
    this.orderSvc.isShowProductDetailModal = false;
    setTimeout(() => {
      this.orderSvc.productSelected = new Product();
    }, 200);
  }

  public onShowGlobalNotesModal(): void {
    this.orderSvc.globalNotesTmp = this.orderSvc.globalNotes;
    this.orderSvc.isShowGlobalNoteModal = true;
  }

  public onEditCustomerName(): void {
    this.orderSvc.customerNameTmp = this.orderSvc.customerName;
    this.orderSvc.isEditCustomerName = true;
  }

  public onSaveCustomerName(): void {
    this.orderSvc.customerName = this.orderSvc.customerNameTmp;
    this.onHideEditCustomerName();
  }

  public onHideEditCustomerName(): void {
    this.orderSvc.isEditCustomerName = false;
    setTimeout(() => {
      this.orderSvc.customerNameTmp = '';
    }, 200);
  }

  public formatTableName(table: string): string {
    return table.replace('T-', 'Table ');
  }

  public onPlaceOrder(): void {
    if (this.orderSvc.cartList.length < 1) {
      this.toast.error('Please select at least one menu item.', 'Error');
      return;
    } else {
      this.orderSvc.isShowOrderDetailModal =
        !this.orderSvc.isShowOrderDetailModal;
    }
  }
}
