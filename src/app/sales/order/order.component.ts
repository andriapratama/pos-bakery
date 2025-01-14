import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoaderService } from '../../@components/loader/loader.service';
import { SidebarService } from '../../@components/sidebar/sidebar.service';
import { Product } from '../../@entities/product';
import { FormatCurrencyPipe } from '../../@pipes/format-currency.pipe';
import { FormatDatePipe } from '../../@pipes/format-date.pipe';
import { FormatTimePipe } from '../../@pipes/format-time.pipe';
import { DummyService } from '../../@services/dummy.service';
import { ToastService } from '../../@services/toast.service';
import { SalesService } from '../sales.service';
import { SideOrderComponent } from './@components/side-order/side-order.component';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    CommonModule,
    FormsModule,
    SideOrderComponent,
    FormatCurrencyPipe,
    FormatDatePipe,
    FormatTimePipe,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  public menuActive: string = '';
  public search: string = '';

  constructor(
    public salesSvc: SalesService,
    public orderSvc: OrderService,
    public dummySvc: DummyService,
    private toast: ToastService,
    public sidebarSvc: SidebarService,
    private loader: LoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.salesSvc.isTemplate = false;
    });

    this.menuActive = 'all-menu';
    this.getProductList(this.menuActive, null);
    this.orderSvc.date = new Date().getTime();
  }

  public onChangeCategory(category: string): void {
    this.menuActive = category;
    this.getProductList(this.menuActive, null);
    this.search = '';
  }

  public onSearch(): void {
    if (this.search) {
      this.menuActive = '';
      this.getProductList(null, this.search);
    } else {
      this.menuActive = 'all-menu';
      this.getProductList(this.menuActive, null);
    }
  }

  getProductList(category: string | null, search: string | null): void {
    if (category) {
      if (category === 'all-menu') {
        this.orderSvc.productList = this.dummySvc.productList;
      } else {
        const filter = this.dummySvc.productList.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase(),
        );
        this.orderSvc.productList = filter;
      }
    } else if (search) {
      const filter = this.dummySvc.productList.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
      this.orderSvc.productList = filter;
    }
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

  public onHideOrderDetailModal(): void {
    this.orderSvc.isShowOrderDetailModal = false;
  }

  public onGetTotalProduct(name: string): string {
    const data = this.dummySvc.productList.filter(
      (product) =>
        product.category.toLowerCase() === name.toLowerCase().replace(' ', '-'),
    );
    return data.length.toString();
  }

  public setCategoryColor(category: string) {
    switch (category) {
      case 'breads':
        return { bg: 'bg-[#f97316]/10', text: 'text-[#f97316]' };
      case 'cakes':
        return { bg: 'bg-[#22c55e]/10', text: 'text-[#22c55e]' };
      case 'donuts':
        return { bg: 'bg-[#06b6d4]/10', text: 'text-[#06b6d4]' };
      case 'pastries':
        return { bg: 'bg-[#6366f1]/10', text: 'text-[#6366f1]' };
      case 'sandwich':
        return { bg: 'bg-[#d946ef]/10', text: 'text-[#d946ef]' };
      case 'coffee':
        return { bg: 'bg-[#f43f5e]/10', text: 'text-[#f43f5e]' };
      case 'non-coffee':
        return { bg: 'bg-[#eab308]/10', text: 'text-[#eab308]' };
      default:
        return { bg: 'bg-[#737373]/10', text: 'text-[#737373]' };
    }
  }

  public onContinueOrder(): void {
    this.loader.show();

    setTimeout(() => {
      this.loader.hide();
      this.onHideOrderDetailModal();
      this.orderSvc.cartList = [];
      this.countSummary();
      this.router.navigateByUrl('/sales/table-management');
    }, 2000);
  }
}
