import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoaderService } from '../../@components/loader/loader.service';
import { Table } from '../../@entities/table';
import { DummyService } from '../../@services/dummy.service';
import { ToastService } from '../../@services/toast.service';

@Component({
  selector: 'app-table-management',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, FormsModule],
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.scss',
})
export class TableManagementComponent implements OnInit {
  public groupedTableList: Record<number, Table[]>;
  public floorActive: number = 1;
  public isShowSearch: boolean = false;
  public isShowFilter: boolean = false;
  public search: string = '';
  public filterStatus: string = '';
  public tableSelected: Table = new Table();
  public isShowTableModal: boolean = false;
  public customerNameTmp: string = '';
  public customerCountTmp: string = '';
  public statusTmp: string = 'served';
  public timeTmp: string = '';
  public isSubmitting: boolean = false;

  constructor(
    public dummySvc: DummyService,
    private toast: ToastService,
    private loader: LoaderService,
  ) {}

  async ngOnInit(): Promise<void> {
    const dataFilter: Table[] = this.dummySvc.tableData.filter(
      (table) => table.floorNumber === this.floorActive,
    );

    await this.groupedData(dataFilter);
  }

  async groupedData(data: Table[]): Promise<void> {
    const grouped = data.reduce(
      (groups, item) => {
        if (!groups[item.maxCustomerCount]) {
          groups[item.maxCustomerCount] = [];
        }

        groups[item.maxCustomerCount].push(item);
        return groups;
      },
      {} as Record<number, Table[]>,
    );

    this.groupedTableList = grouped;
  }

  public async onSelectFloor(floor: number): Promise<void> {
    this.search = '';
    this.floorActive = floor;

    let dataFilter: Table[] = [];

    if (this.filterStatus) {
      dataFilter = this.dummySvc.tableData.filter(
        (table) =>
          table.floorNumber === floor && table.status === this.filterStatus,
      );
    } else {
      dataFilter = this.dummySvc.tableData.filter(
        (table) => table.floorNumber === floor,
      );
    }

    await this.groupedData(dataFilter);
  }

  public onShowSearch(): void {
    this.isShowSearch = !this.isShowSearch;
    this.isShowFilter = false;
  }

  public async onSearch(): Promise<void> {
    if (this.search) {
      const dataFilter: Table[] = this.dummySvc.tableData.filter(
        (table) =>
          table.table.toLowerCase().includes(this.search) ||
          table.customerName.toLowerCase().includes(this.search),
      );

      await this.groupedData(dataFilter);
    } else {
      await this.onSelectFloor(1);
    }
  }

  public onShowFilter(): void {
    this.isShowFilter = !this.isShowFilter;
    this.isShowSearch = false;
  }

  public async onSelectFilterStatus(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterStatus = selectedValue;

    await this.onSelectFloor(this.floorActive);
  }

  public async onRemoveFilter(): Promise<void> {
    this.search = '';
    this.isShowSearch = false;
    this.filterStatus = '';
    this.isShowFilter = false;
    await this.onSelectFloor(1);
  }

  public onShowTableModal(table: Table): void {
    this.tableSelected = table;
    this.isShowTableModal = true;
  }

  public onHideTableModal(): void {
    setTimeout(() => {
      this.tableSelected = new Table();
      this.customerCountTmp = '';
      this.customerNameTmp = '';
      this.statusTmp = 'served';
      this.timeTmp = '';
    }, 200);
    this.isShowTableModal = false;
  }

  public onFormatCustomerCountTmp(): void {
    const newCount = this.customerCountTmp.replace(/\D+/g, '');
    this.customerCountTmp = newCount;
  }

  public async onTableSubmit(): Promise<void> {
    let errorMessage: string = '';

    if (!this.customerCountTmp) errorMessage = 'Customer count is required!';
    if (parseInt(this.customerCountTmp) > this.tableSelected.maxCustomerCount)
      errorMessage = `Customer count exceeds the maximum limit of ${this.tableSelected.maxCustomerCount}.`;
    if (!this.customerNameTmp) errorMessage = 'Customer name is required! ';

    if (errorMessage) {
      this.toast.error(errorMessage, 'Error');
    } else {
      if (this.statusTmp === 'reserved' && !this.timeTmp)
        errorMessage = 'Time is required!';

      if (errorMessage) {
        this.toast.error(errorMessage, 'Error');
      } else {
        await this.storeTable();
      }
    }
  }

  async storeTable(): Promise<void> {
    this.isSubmitting = true;
    this.loader.show();

    const time = new Date().getTime();

    console.log(time);

    const index = this.dummySvc.tableData.findIndex(
      (table) => table.table === this.tableSelected.table,
    );

    this.dummySvc.tableData[index].customerCount =
      this.tableSelected.customerCount;
    this.dummySvc.tableData[index].customerName =
      this.tableSelected.customerName;
    this.dummySvc.tableData[index].status = this.tableSelected.status;
    this.dummySvc.tableData[index].time = this.tableSelected.status;

    setTimeout(() => {
      this.onHideTableModal();
      this.isSubmitting = false;
      this.loader.hide();
    }, 3000);
  }
}
