import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarComponent {}
