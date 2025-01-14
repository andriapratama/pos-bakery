import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  public menuList: Array<{ name: string; icon: string; route: string }> = [
    {
      name: 'Sales',
      icon: 'icons/trending-up.svg',
      route: '/sales',
    },
    {
      name: 'Report',
      icon: 'icons/chart-pie.svg',
      route: '/report',
    },
    {
      name: 'Iventory',
      icon: 'icons/boxes.svg',
      route: '/iventory',
    },
    {
      name: 'Teams',
      icon: 'icons/user-group.svg',
      route: '/teams',
    },
    {
      name: 'Settings',
      icon: 'icons/cog-8-tooth.svg',
      route: '/settings',
    },
  ];

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
