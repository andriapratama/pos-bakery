import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true,
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, style: 'short' | 'full'): string {
    if (style === 'short') {
      if (value >= 1000) {
        const newFormat = (value / 1000).toFixed(0) + 'K';
        return `IDR ${newFormat}`;
      }
      return `IDR ${value.toString()}`;
    } else {
      const newFormat = new Intl.NumberFormat().format(value);
      return `IDR ${newFormat}`;
    }
  }
}
