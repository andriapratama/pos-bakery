import { AngularSvgIconModule } from 'angular-svg-icon';
import { filter } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../@components/sidebar/sidebar.component';
import { SidebarService } from '../@components/sidebar/sidebar.service';
import { Menu, menuList } from '../@entities/menu';
import { FormatDatePipe } from '../@pipes/format-date.pipe';
import { SideOrderComponent } from './order/@components/side-order/side-order.component';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularSvgIconModule,
    CommonModule,
    FormatDatePipe,
    SidebarComponent,
    SideOrderComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  public date: number;
  public routeActive: string = '';
  public menuList: Array<Menu> = [];
  public firstNameMenu: string = '';
  public secondNameMenu: string = '';

  constructor(
    public salesSvc: SalesService,
    public sidebarSvc: SidebarService,
    public router: Router,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        this.routeActive = currentUrl;
        this.setMenuList();
      });
  }

  ngOnInit(): void {
    this.date = new Date().getTime();
  }

  setMenuList(): void {
    const firstRoute: string = this.routeActive.split('/')[1];
    const filterFirstMenu: Menu[] = menuList.filter((menu) =>
      menu.route.includes(firstRoute),
    );
    this.firstNameMenu = filterFirstMenu[0].name;
    if (filterFirstMenu[0].children)
      this.menuList = filterFirstMenu[0].children;

    const secondRoute: string = this.routeActive.split('/')[2];
    const filterSecondMenu: Menu[] = this.menuList.filter((menu) =>
      menu.route.includes(secondRoute),
    );
    this.secondNameMenu = filterSecondMenu[0].name;
  }

  public onClickRouter(router: string): void {
    this.router.navigateByUrl(router).then();
  }
}
