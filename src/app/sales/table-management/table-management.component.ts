import { DummyService } from './../../@services/dummy.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Table } from '../../@entities/table';

@Component({
  selector: 'app-table-management',
  standalone: true,
  imports: [HttpClientModule, AngularSvgIconModule, CommonModule],
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.scss',
})
export class TableManagementComponent implements OnInit {
  public groupedTableList: Record<number, Table[]>;
  public floorActive: number = 1;

  constructor(public dummySvc: DummyService) {}

  ngOnInit(): void {
    const dataFilter: Table[] = this.dummySvc.tableData.filter(
      (table) => table.floorNumber === this.floorActive,
    );

    const grouped = dataFilter.reduce(
      (groups, item) => {
        if (!groups[item.maxPerson]) {
          groups[item.maxPerson] = [];
        }

        groups[item.maxPerson].push(item);
        return groups;
      },
      {} as Record<number, Table[]>,
    );

    this.groupedTableList = grouped;

    console.log(this.groupedTableList);
  }
}
