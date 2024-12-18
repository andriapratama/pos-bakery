import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: number): string {
    const day = new Date(value).toLocaleDateString('en-US', {
      weekday: 'short',
    });
    const date = new Date(value).toLocaleDateString('en-US', {
      day: '2-digit',
    });
    const monthAndYear = new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    return `${day}, ${date} ${monthAndYear}`;
  }
}
