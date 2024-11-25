import { AngularSvgIconModule } from 'angular-svg-icon';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [RouterOutlet, AngularSvgIconModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {}
