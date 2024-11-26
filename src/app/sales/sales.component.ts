import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [RouterOutlet, AngularSvgIconModule, CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  constructor(public salesSvc: SalesService) {}
}
