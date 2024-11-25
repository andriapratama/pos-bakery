import { Injectable } from '@angular/core';

import { Table } from '../@entities/table';

@Injectable({
  providedIn: 'root',
})
export class DummyService {
  public tableData: Table[] = [
    {
      table: 'T-01',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-02',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-03',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-04',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-05',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-06',
      customerCount: 0,
      customerName: 'Megan Webb',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-07',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-08',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-09',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-10',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-11',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-12',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-13',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-14',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-15',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-16',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-17',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-18',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-19',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-20',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-21',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-22',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-23',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-24',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-25',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-26',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-27',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-28',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-29',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-30',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-31',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-32',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-33',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-34',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-35',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-36',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-37',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 1,
      time: '',
    },
    {
      table: 'T-38',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 4,
      status: 'available',
      floorNumber: 3,
      time: '',
    },
    {
      table: 'T-39',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 2,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
    {
      table: 'T-40',
      customerCount: 0,
      customerName: '',
      maxCustomerCount: 12,
      status: 'available',
      floorNumber: 2,
      time: '',
    },
  ];

  constructor() {}
}
