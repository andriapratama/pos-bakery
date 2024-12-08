import { Product } from './../../@entities/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public productList: Product[] = [];
  public productSelected: Product = new Product();
  public cartList: Product[] = [];
  public isShowProductDetailModal: boolean = false;
  public subTotal: number = 0;
  public tax: number = 0;
  public discount: number = 0;
  public total: number = 0;

  public globalNotes: string = '';
  public globalNotesTmp: string = '';
  public isShowGlobalNoteModal: boolean = false;

  public customerName: string = 'Eloise';
  public customerNameTmp: string = '';
  public isEditCustomerName: boolean = false;

  constructor() {}
}
