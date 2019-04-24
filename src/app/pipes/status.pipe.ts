import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bueno';
      case 'bad': return 'Malo';
      case 'dead': return 'Sin vida';
    }
    return null;
  }
}
