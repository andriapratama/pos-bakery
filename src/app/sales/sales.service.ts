import { Injectable } from '@angular/core';

import { sales } from '../@entities/sales';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  public isTemplate: boolean = false;
  public salesList: Array<sales> = [];

  constructor() {}
}
