import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Menu, menuList } from '../../@entities/menu';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  public routeActive: string = '';
  public menuList: Array<Menu> = menuList;

  constructor(
    public sidebarSvc: SidebarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const url = this.router.url.split('/')[1];
    this.routeActive = url;
  }

  public onRouter(route: string): void {
    this.router.navigateByUrl(route).then();
    this.sidebarSvc.onShow();
  }

  public matchRoute(route: string): boolean {
    const match: boolean = route.includes(this.routeActive);
    return match;
  }
}
