import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AngularSvgIconModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {}
