import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public menuList: Array<{ name: string; icon: string; route: string }> = [
    {
      name: 'Point of Sales',
      icon: 'icons/laptop-minimal.svg',
      route: '/sales',
    },
    {
      name: 'Activity',
      icon: 'icons/trending-up.svg',
      route: '/activity',
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

  constructor(public sidebarSvc: SidebarService) {}
}
